import { Module } from '@nestjs/common'
import { GrpcModule } from '@vendee-cinema/common'

import { AccountModule } from '../account'

import { SessionController } from './session.controller'
import { SessionClientGrpc } from './session.grpc'

@Module({
	imports: [GrpcModule.register(['SESSION_PACKAGE']), AccountModule],
	controllers: [SessionController],
	providers: [SessionClientGrpc],
	exports: [SessionClientGrpc]
})
export class SessionModule {}
