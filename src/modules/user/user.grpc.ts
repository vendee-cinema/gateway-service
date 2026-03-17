import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { UserServiceClient } from '@vendee-cinema/contracts/gen/user'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class UserClientGrpc extends AbstractGrpcClient<UserServiceClient> {
	public constructor(@InjectGrpcClient('USER_PACKAGE') client: ClientGrpc) {
		super(client, 'UserService')
	}
}
