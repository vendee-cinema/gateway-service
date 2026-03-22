import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { CategoryController } from './category.controller'
import { CategoryClientGrpc } from './category.grpc'

@Module({
	imports: [GrpcModule.register(['CATEGORY_PACKAGE'])],
	controllers: [CategoryController],
	providers: [CategoryClientGrpc],
	exports: [CategoryClientGrpc]
})
export class CategoryModule {}
