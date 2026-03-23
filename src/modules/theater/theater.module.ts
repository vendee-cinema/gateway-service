import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { AccountModule } from '../account'

import { TheaterController } from './theater.controller'
import { TheaterClientGrpc } from './theater.grpc'

@Module({
	imports: [GrpcModule.register(['THEATER_PACKAGE']), AccountModule],
	controllers: [TheaterController],
	providers: [TheaterClientGrpc],
	exports: [TheaterClientGrpc]
})
export class TheaterModule {}
