import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { CurrentUser, Protected } from '@/shared/decorators'

import { CreateRefundRequest } from './dto'
import { RefundClientGrpc } from './refund.grpc'

@Controller('refunds')
export class RefundController {
	public constructor(private readonly refund: RefundClientGrpc) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Protected()
	@ApiBearerAuth()
	public async createRefund(
		@Body() dto: CreateRefundRequest,
		@CurrentUser() userId: string
	) {
		return await this.refund.call('createRefund', { ...dto, userId })
	}
}
