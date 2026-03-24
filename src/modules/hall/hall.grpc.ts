import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { HallServiceClient } from '@vendee-cinema/contracts/hall'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class HallClientGrpc extends AbstractGrpcClient<HallServiceClient> {
	public constructor(@InjectGrpcClient('HALL_PACKAGE') client: ClientGrpc) {
		super(client, 'HallService')
	}
}
