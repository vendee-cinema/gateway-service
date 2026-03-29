import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { PaymentClientGrpc } from '../payments'

import { LiqPayCallback } from './dto'

@Controller('webhook')
export class WebhookController {
	public constructor(private readonly payment: PaymentClientGrpc) {}

	@Post('liqpay')
	@HttpCode(HttpStatus.OK)
	public async handleLiqPay(@Body() dto: LiqPayCallback) {
		console.log('DTO: ', dto)

		return await this.payment.call('processPaymentEvent', {
			...dto,
			provider: 'liqpay'
		})
	}
}
