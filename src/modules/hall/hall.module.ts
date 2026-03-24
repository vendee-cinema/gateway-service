import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { AccountModule } from '../account'

import { HallController } from './hall.controller'
import { HallClientGrpc } from './hall.grpc'

@Module({
	imports: [GrpcModule.register(['HALL_PACKAGE']), AccountModule],
	controllers: [HallController],
	providers: [HallClientGrpc],
	exports: [HallClientGrpc]
})
export class HallModule {}
