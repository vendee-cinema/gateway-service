import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { SessionServiceClient } from '@vendee-cinema/contracts/session'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class SessionClientGrpc extends AbstractGrpcClient<SessionServiceClient> {
	public constructor(@InjectGrpcClient('SESSION_PACKAGE') client: ClientGrpc) {
		super(client, 'SessionService')
	}
}
