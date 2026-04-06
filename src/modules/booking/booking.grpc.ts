import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { BookingServiceClient } from '@vendee-cinema/contracts/booking'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class BookingClientGrpc extends AbstractGrpcClient<BookingServiceClient> {
	public constructor(@InjectGrpcClient('BOOKING_PACKAGE') client: ClientGrpc) {
		super(client, 'BookingService')
	}
}
