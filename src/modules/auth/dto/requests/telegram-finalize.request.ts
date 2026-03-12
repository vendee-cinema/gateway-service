import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramFinalizeRequest {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'cde1d6f907632076b7faa65fe6e18abf' })
	public sessionId: string
}
