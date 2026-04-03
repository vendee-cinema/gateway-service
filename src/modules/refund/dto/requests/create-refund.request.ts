import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRefundRequest {
	@IsString()
	@IsNotEmpty()
	public bookingId: string
}
