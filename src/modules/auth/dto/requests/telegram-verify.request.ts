import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramVerifyRequest {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'eyJpZCI6NTYzMTAyNzc5LCJmaXJzdF9uYW1lIjoiXHUwNDExXHUwND...'
	})
	public tgAuthResult: string
}
