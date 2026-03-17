import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { UserController } from './user.controller'
import { UserClientGrpc } from './user.grpc'

@Module({
	imports: [GrpcModule.register(['USER_PACKAGE'])],
	controllers: [UserController],
	providers: [UserClientGrpc],
	exports: [UserClientGrpc]
})
export class UserModule {}
