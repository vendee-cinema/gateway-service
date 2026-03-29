import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { PaymentController } from './payment.controller'
import { PaymentClientGrpc } from './payment.grpc'

@Module({
	imports: [GrpcModule.register(['PAYMENT_PACKAGE'])],
	controllers: [PaymentController],
	providers: [PaymentClientGrpc],
	exports: [PaymentClientGrpc]
})
export class PaymentModule {}
