import {
	BadRequestException,
	Body,
	Controller,
	FileTypeValidator,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	ParseFilePipe,
	Patch,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiOperation
} from '@nestjs/swagger'
import { randomBytes } from 'crypto'

import { CurrentUser, Protected } from '@/shared/decorators'

import { MediaClientGrpc } from '../media'

import { GetMeResponse, PatchUserRequest } from './dto'
import { UserClientGrpc } from './user.grpc'

@Controller('users')
export class UserController {
	public constructor(
		private readonly userClient: UserClientGrpc,
		private readonly mediaClient: MediaClientGrpc
	) {}

	@Get('@me')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiOperation({
		summary: 'Get current user profile',
		description: 'Returns authenticated user profile data'
	})
	@ApiOkResponse({ type: GetMeResponse })
	@ApiBearerAuth()
	public async getMe(@CurrentUser() userId: string) {
		const { user } = await this.userClient.call('getMe', { id: userId })
		return user
	}

	@Patch('@me')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiOperation({ summary: 'Update current user profile data' })
	@ApiBearerAuth()
	public async patchUser(
		@CurrentUser() userId: string,
		@Body() dto: PatchUserRequest
	) {
		return await this.userClient.call('patchUser', { userId, ...dto })
	}

	@Patch('@me/avatar')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({
		summary: 'Update user avatar',
		description: 'Uploads a new avatar for the authenticated user'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Image file to upload',
		schema: {
			type: 'object',
			properties: { file: { type: 'string', format: 'binary' } }
		}
	})
	@ApiBearerAuth()
	public async changeAvatar(
		@CurrentUser() userId: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10 * 1024 * 1024,
						message: 'File size cannot be more than 10MB'
					}),
					new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/i })
				],
				exceptionFactory(error) {
					if (error.includes('File is too large'))
						throw new BadRequestException('File size cannot be more than 10MB')
					if (error.includes('Invalid file type'))
						throw new BadRequestException(
							'Allowed file types is JPG, JPEG, PNG, WEBP and GIF'
						)
					throw new BadRequestException('Invalid file')
				}
			})
		)
		file: Express.Multer.File
	) {
		const response = await this.mediaClient.call('upload', {
			fileName: randomBytes(16).toString('hex'),
			folder: 'users',
			contentType: file.mimetype,
			data: new Uint8Array(file.buffer),
			resizeWidth: 512,
			resizeHeight: 512
		})
		return await this.userClient.call('patchUser', {
			userId,
			avatar: response.key
		})
	}
}
