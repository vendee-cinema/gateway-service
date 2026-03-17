import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PROTO_PATHS } from '@vendee-cinema/contracts'

import { UserController } from './user.controller'
import { UserClientGrpc } from './user.grpc'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'USER_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'user.v1',
						protoPath: PROTO_PATHS.USER,
						url: configService.getOrThrow<string>('USER_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [UserController],
	providers: [UserClientGrpc],
	exports: [UserClientGrpc]
})
export class UserModule {}
