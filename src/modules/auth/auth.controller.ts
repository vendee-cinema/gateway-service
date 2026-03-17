import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import type { Request, Response } from 'express'

import { AuthClientGrpc } from './auth.grpc'
import {
	SendOtpRequest,
	TelegramFinalizeRequest,
	TelegramVerifyRequest,
	VerifyOtpRequest
} from './dto'

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly configService: ConfigService,
		private readonly client: AuthClientGrpc
	) {}

	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Send OTP code',
		description: 'Sends a verification code to user phone  or email'
	})
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.call('sendOtp', dto)
	}

	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Verify OTP code',
		description:
			'Verifies the code sent to the user phone or email and returns an access token'
	})
	public async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) response: Response
	) {
		const { accessToken, refreshToken } = await this.client.call(
			'verifyOtp',
			dto
		)

		response.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}

	@Post('/refresh')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Refresh access token',
		description: 'Renews access token using refresh token from cookies'
	})
	public async refresh(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	) {
		const { refreshToken } = request.cookies
		const { accessToken, refreshToken: newRefreshToken } =
			await this.client.call('refresh', { refreshToken })

		response.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Logout',
		description: 'Removes the refresh token cookie and logs the user out'
	})
	public async logout(@Res({ passthrough: true }) response: Response) {
		response.cookie('refreshToken', '', {
			httpOnly: true,
			secure: true,
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			expires: new Date(0)
		})

		return { ok: true }
	}

	@Get('telegram')
	@HttpCode(HttpStatus.OK)
	public async telegramInit() {
		return this.client.call('telegramInit', {})
	}

	@Post('telegram/verify')
	@HttpCode(HttpStatus.OK)
	public async telegramVerify(
		@Body() dto: TelegramVerifyRequest,
		@Res({ passthrough: true }) response: Response
	) {
		const query = JSON.parse(atob(dto.tgAuthResult))
		const result = await this.client.call('telegramVerify', { query })
		if ('url' in result && result.url) return result
		if (!result.accessToken || !result.refreshToken)
			throw new UnauthorizedException('Invalid Telegram login response')

		const { accessToken, refreshToken } = result
		response.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}

	@Post('telegram/finalize')
	@HttpCode(HttpStatus.OK)
	public async finalizeTelegramLogin(
		@Body() dto: TelegramFinalizeRequest,
		@Res({ passthrough: true }) response: Response
	) {
		const { accessToken, refreshToken } = await this.client.call(
			'telegramConsume',
			dto
		)

		response.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { accessToken }
	}
}
