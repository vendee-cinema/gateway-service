import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { RefundController } from './refund.controller'
import { RefundClientGrpc } from './refund.grpc'

@Module({
	imports: [GrpcModule.register(['REFUND_PACKAGE'])],
	controllers: [RefundController],
	providers: [RefundClientGrpc],
	exports: [RefundClientGrpc]
})
export class RefundModule {}
