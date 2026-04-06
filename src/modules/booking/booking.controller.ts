import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { CurrentUser, Protected } from '@/shared/decorators'

import { BookingClientGrpc } from './booking.grpc'

@Controller('bookings')
export class BookingController {
	public constructor(private readonly booking: BookingClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@Protected()
	@ApiBearerAuth()
	public async getUserBookings(@CurrentUser() userId: string) {
		const { bookings } = await this.booking.call('getUserBookings', {
			userId
		})
		return Array.isArray(bookings) ? bookings : []
	}
}
