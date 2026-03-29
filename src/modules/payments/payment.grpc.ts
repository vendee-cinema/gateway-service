import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { PaymentServiceClient } from '@vendee-cinema/contracts/payment'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class PaymentClientGrpc extends AbstractGrpcClient<PaymentServiceClient> {
	public constructor(@InjectGrpcClient('PAYMENT_PACKAGE') client: ClientGrpc) {
		super(client, 'PaymentService')
	}
}
