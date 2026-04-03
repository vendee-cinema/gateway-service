import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { CurrentUser, Protected } from '@/shared/decorators'

import { InitPaymentRequest } from './dto/requests'
import { PaymentClientGrpc } from './payment.grpc'

@Controller('payments')
export class PaymentController {
	public constructor(private readonly payment: PaymentClientGrpc) {}

	@Post('init')
	@HttpCode(HttpStatus.CREATED)
	@Protected()
	@ApiBearerAuth()
	public async initPayment(
		@Body() dto: InitPaymentRequest,
		@CurrentUser() userId: string
	) {
		return await this.payment.call('createPayment', { ...dto, userId })
	}

	@Get(':paymentId/status')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiBearerAuth()
	public async getPaymentStatus(@Param('paymentId') paymentId: string) {
		return await this.payment.call('getPaymentStatus', { paymentId })
	}

	@Get('methods')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiBearerAuth()
	public async getUserPaymentMethods(@CurrentUser('id') userId: string) {
		const { methods } = await this.payment.call('getUserPaymentMethods', {
			userId
		})
		return Array.isArray(methods) ? methods : []
	}

	@Post('methods')
	@HttpCode(HttpStatus.CREATED)
	@Protected()
	@ApiBearerAuth()
	public async createPaymentMethod(@CurrentUser('id') userId: string) {
		return await this.payment.call('createPaymentMethod', { userId })
	}

	@Post('methods/verify/:id')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiBearerAuth()
	public async verifyPaymentMethod(
		@CurrentUser() userId: string,
		@Param('id') methodId: string
	) {
		return await this.payment.call('verifyPaymentMethod', { userId, methodId })
	}

	@Delete('methods/:id')
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiBearerAuth()
	public async deletePaymentMethod(
		@CurrentUser() userId: string,
		@Param('id') methodId: string
	) {
		return await this.payment.call('deletePaymentMethod', { userId, methodId })
	}
}
