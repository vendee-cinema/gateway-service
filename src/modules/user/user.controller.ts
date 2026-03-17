import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { GetMeResponse, PatchUserRequest } from './dto'
import { UserClientGrpc } from './user.grpc'

@Controller('users')
export class UserController {
	public constructor(private readonly client: UserClientGrpc) {}

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
		const { user } = await lastValueFrom(this.client.getMe({ id: userId }))
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
		return await lastValueFrom(this.client.patch({ userId, ...dto }))
	}
}
