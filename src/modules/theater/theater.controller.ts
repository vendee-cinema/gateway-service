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
		const { theaters } = await this.theater.call('listTheaters', {})
		return Array.isArray(theaters) ? theaters : []
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		const { theater } = await this.theater.call('getTheater', { id })
		return theater
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	// @Protected(Role.ADMIN)
	public async create(@Body() dto: CreateTheaterRequest) {
		const { theater } = await this.theater.call('createTheater', dto)
		return theater
	}
}
