import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { AccountModule } from '../account'

import { SeatController } from './seat.controller'
import { SeatClientGrpc } from './seat.grpc'

@Module({
	imports: [GrpcModule.register(['SEAT_PACKAGE']), AccountModule],
	controllers: [SeatController],
	providers: [SeatClientGrpc],
	exports: [SeatClientGrpc]
})
export class SeatModule {}
