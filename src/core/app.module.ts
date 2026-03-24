import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@vendee-cinema/passport'

import { AccountModule } from '@/modules/account'
import { CategoryModule } from '@/modules/category'
import { HallModule } from '@/modules/hall'
import { MovieModule } from '@/modules/movie'
import { SeatModule } from '@/modules/seat'
import { TheaterModule } from '@/modules/theater'
import { UserModule } from '@/modules/user'
import { ObservabilityModule } from '@/observability'

import { AuthModule } from '../modules/auth'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getPassportConfig } from './config'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env'
			]
		}),
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		}),
		ObservabilityModule,
		AuthModule,
		AccountModule,
		UserModule,
		MovieModule,
		CategoryModule,
		TheaterModule,
		HallModule,
		SeatModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
