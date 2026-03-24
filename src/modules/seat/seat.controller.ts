import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'

import { SeatClientGrpc } from './seat.grpc'

@Controller('seats')
export class SeatController {
	public constructor(private readonly seat: SeatClientGrpc) {}

	@Get(':hallId/:sessionId')
	@HttpCode(HttpStatus.OK)
	public async listByHall(
		@Param('hallId') hallId: string,
		@Param('sessionId') sessionId: string
	) {
		const { seats } = await this.seat.call('listSeatsByHall', {
			hallId,
			sessionId
		})
		return Array.isArray(seats) ? seats : []
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		const { seat } = await this.seat.call('getSeat', { id })
		return seat
	}
}
