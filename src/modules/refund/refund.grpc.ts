import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { RefundServiceClient } from '@vendee-cinema/contracts/refund'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class RefundClientGrpc extends AbstractGrpcClient<RefundServiceClient> {
	public constructor(@InjectGrpcClient('REFUND_PACKAGE') client: ClientGrpc) {
		super(client, 'RefundService')
	}
}
