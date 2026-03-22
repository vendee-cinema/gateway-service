import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { MovieServiceClient } from '@vendee-cinema/contracts/gen/ts/movie'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class MovieClientGrpc extends AbstractGrpcClient<MovieServiceClient> {
	public constructor(@InjectGrpcClient('MOVIE_PACKAGE') client: ClientGrpc) {
		super(client, 'MovieService')
	}
}
