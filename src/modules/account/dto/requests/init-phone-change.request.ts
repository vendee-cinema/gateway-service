import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class InitPhoneChangeRequest {
	@IsString()
	@IsNotEmpty()
	@Matches(/^\+[1-9]\d{1,14}$/)
	@ApiProperty({ example: '+380123456789' })
	public phone: string
}
