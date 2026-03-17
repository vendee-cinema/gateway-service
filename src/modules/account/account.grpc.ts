import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { AccountServiceClient } from '@vendee-cinema/contracts/gen/account'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class AccountClientGrpc extends AbstractGrpcClient<AccountServiceClient> {
	public constructor(@InjectGrpcClient('ACCOUNT_PACKAGE') client: ClientGrpc) {
		super(client, 'AccountService')
	}
}
