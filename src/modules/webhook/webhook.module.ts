import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { PaymentClientGrpc } from '../payments'

import { WebhookController } from './webhook.controller'

@Module({
	imports: [GrpcModule.register(['PAYMENT_PACKAGE'])],
	controllers: [WebhookController],
	providers: [PaymentClientGrpc],
	exports: [PaymentClientGrpc]
})
export class WebhookModule {}
