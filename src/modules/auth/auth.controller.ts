import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { SendOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Send OTP code',
		description: 'Sends a verifivation code to user phone or email'
	})
	public sendOtp(@Body() dto: SendOtpRequest) {
		console.log('DATA: ', dto)
		return { ok: true }
	}
}
