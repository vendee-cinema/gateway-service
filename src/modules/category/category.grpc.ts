import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@vendee-cinema/common'
import type { CategoryServiceClient } from '@vendee-cinema/contracts/category'

import { AbstractGrpcClient } from '@/shared/grpc'

@Injectable()
export class CategoryClientGrpc extends AbstractGrpcClient<CategoryServiceClient> {
	public constructor(@InjectGrpcClient('CATEGORY_PACKAGE') client: ClientGrpc) {
		super(client, 'CategoryService')
	}
}
