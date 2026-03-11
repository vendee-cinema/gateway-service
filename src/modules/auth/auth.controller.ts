import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { lastValueFrom } from 'rxjs'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

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
		return this.client.sendOtp(dto)
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
		const { accessToken, refreshToken } = await lastValueFrom(
			this.client.verifyOtp(dto)
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
		const refreshToken = request.cookies.refreshToken
		const { accessToken, refreshToken: newRefreshToken } = await lastValueFrom(
			this.client.refresh({ refreshToken })
		)
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
}
