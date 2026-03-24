import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'

import { CreateTheaterRequest } from './dto'
import { TheaterClientGrpc } from './theater.grpc'

@Controller('theaters')
export class TheaterController {
	public constructor(private readonly theater: TheaterClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll() {
		const response = await this.theater.call('listTheaters', {})
		return Array.isArray(response.theaters) ? response.theaters : []
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		return await this.theater.call('getTheater', { id })
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	// @Protected(Role.ADMIN)
	public async create(@Body() dto: CreateTheaterRequest) {
		return await this.theater.call('createTheater', dto)
	}
}
