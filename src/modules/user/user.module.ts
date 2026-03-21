import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { MediaClientGrpc } from '../media'

import { UserController } from './user.controller'
import { UserClientGrpc } from './user.grpc'

@Module({
	imports: [GrpcModule.register(['USER_PACKAGE', 'MEDIA_PACKAGE'])],
	controllers: [UserController],
	providers: [UserClientGrpc, MediaClientGrpc],
	exports: [UserClientGrpc]
})
export class UserModule {}
