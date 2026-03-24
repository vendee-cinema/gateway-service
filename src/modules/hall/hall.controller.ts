import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'

import { CreateHallRequest } from './dto'
import { HallClientGrpc } from './hall.grpc'

@Controller('halls')
export class HallController {
	public constructor(private readonly hall: HallClientGrpc) {}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		return await this.hall.call('getHall', { id })
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	// @Protected(Role.ADMIN)
	public async create(@Body() dto: CreateHallRequest) {
		return await this.hall.call('createHall', dto)
	}
}
