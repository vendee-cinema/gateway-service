import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { TheaterServiceClient } from '@vendee-cinema/contracts/theater'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class TheaterClientGrpc extends AbstractGrpcClient<TheaterServiceClient> {
	public constructor(@InjectGrpcClient('THEATER_PACKAGE') client: ClientGrpc) {
		super(client, 'TheaterService')
	}
}
