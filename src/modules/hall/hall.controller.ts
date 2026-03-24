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
		const { hall } = await this.hall.call('getHall', { id })
		return hall
	}

	@Get('theater/:theaterId')
	@HttpCode(HttpStatus.OK)
	public async getByTheater(@Param('theaterId') theaterId: string) {
		const { halls } = await this.hall.call('listHallsByTheater', { theaterId })
		return Array.isArray(halls) ? halls : []
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	// @Protected(Role.ADMIN)
	public async create(@Body() dto: CreateHallRequest) {
		const { hall } = await this.hall.call('createHall', dto)
		return hall
	}
}
