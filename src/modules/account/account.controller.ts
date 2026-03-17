import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { CurrentUser, Protected } from '@/shared/decorators'

import { AccountClientGrpc } from './account.grpc'
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest
} from './dto'

@Controller('account')
export class AccountController {
	public constructor(private readonly client: AccountClientGrpc) {}

	@Post('email/init')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiOperation({
		summary: 'Init email change',
		description: "Sends a confirmation code to a user's new email address"
	})
	@ApiBearerAuth()
	public initEmailChange(
		@Body() dto: InitEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('initEmailChange', { ...dto, userId })
	}

	@Post('email/confirm')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiOperation({
		summary: 'Confirm email change',
		description: "Verifies confirmation code and updates user's email address"
	})
	@ApiBearerAuth()
	public confirmEmailChange(
		@Body() dto: ConfirmEmailChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('confirmEmailChange', { ...dto, userId })
	}

	@Post('phone/init')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiOperation({
		summary: 'Init phone change',
		description: "Sends a confirmation code to a user's new phone number"
	})
	@ApiBearerAuth()
	public initPhoneChange(
		@Body() dto: InitPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('initPhoneChange', { ...dto, userId })
	}

	@Post('phone/confirm')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiOperation({
		summary: 'Confirm phone change',
		description: "Verifies confirmation code and updates user's phone number"
	})
	@ApiBearerAuth()
	public confirmPhoneChange(
		@Body() dto: ConfirmPhoneChangeRequest,
		@CurrentUser() userId: string
	) {
		return this.client.call('confirmPhoneChange', { ...dto, userId })
	}
}
