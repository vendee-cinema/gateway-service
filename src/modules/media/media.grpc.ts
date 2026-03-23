import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { MediaServiceClient } from '@vendee-cinema/contracts/media'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class MediaClientGrpc extends AbstractGrpcClient<MediaServiceClient> {
	public constructor(@InjectGrpcClient('MEDIA_PACKAGE') client: ClientGrpc) {
		super(client, 'MediaService')
	}
}
