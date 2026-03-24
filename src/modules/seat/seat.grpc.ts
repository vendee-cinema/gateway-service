import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { SeatServiceClient } from '@vendee-cinema/contracts/seat'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class SeatClientGrpc extends AbstractGrpcClient<SeatServiceClient> {
	public constructor(@InjectGrpcClient('SEAT_PACKAGE') client: ClientGrpc) {
		super(client, 'SeatService')
	}
}
