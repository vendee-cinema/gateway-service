import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@vendee-cinema/passport'

import { AccountModule } from '@/modules/account'

import { AuthModule } from '../modules/auth'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getPassportConfig } from './config'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		}),
		AuthModule,
		AccountModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
