import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { BookingController } from './booking.controller'
import { BookingClientGrpc } from './booking.grpc'

@Module({
	imports: [GrpcModule.register(['BOOKING_PACKAGE'])],
	controllers: [BookingController],
	providers: [BookingClientGrpc],
	exports: [BookingClientGrpc]
})
export class BookingModule {}
