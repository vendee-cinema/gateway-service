import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { AppService } from './app.service'
import { HealthResponse } from './dto'

@Controller()
export class AppController {
	public constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({
		summary: 'Welcome endpoint',
		description: 'Returns a simple API welcome message'
	})
	public getHello() {
		return this.appService.getHello()
	}

	@Get('health')
	@ApiOperation({
		summary: 'Health check',
		description:
			'Checks is the gateway is running. Returns OK status and call timestamp'
	})
	@ApiOkResponse({
		type: HealthResponse
	})
	public health() {
		return this.appService.health()
	}
}
