import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { CurrentUser, Protected } from '@/shared/decorators'

import { InitPaymentRequest } from './dto/requests'
import { PaymentClientGrpc } from './payment.grpc'

@Controller('payment')
export class PaymentController {
	public constructor(private readonly payment: PaymentClientGrpc) {}

	@Post('init')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiBearerAuth()
	public async initPayment(
		@Body() dto: InitPaymentRequest,
		@CurrentUser() userId: string
	) {
		return await this.payment.call('createPayment', { ...dto, userId })
	}
}
