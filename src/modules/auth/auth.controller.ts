import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	public constructor(private readonly client: AuthClientGrpc) {}

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
		description: 'Verifies the code sent to the user phone or email and returns an access token'
	})
	public verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.client.verifyOtp(dto)
	}
}
