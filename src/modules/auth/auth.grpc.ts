import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { AuthServiceClient } from '@vendee-cinema/contracts/gen/ts/auth'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class AuthClientGrpc extends AbstractGrpcClient<AuthServiceClient> {
	public constructor(@InjectGrpcClient('AUTH_PACKAGE') client: ClientGrpc) {
		super(client, 'AuthService')
	}
}
