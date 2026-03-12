import { ApiProperty } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Matches
} from 'class-validator'

export class ConfirmPhoneChangeRequest {
	@IsString()
	@IsNotEmpty()
	@Matches(/^\+[1-9]\d{1,14}$/)
	@ApiProperty({ example: '+380123456789' })
	public phone: string

	@IsNumberString()
	@IsNotEmpty()
	@ApiProperty({ example: '123456' })
	@Length(6, 6)
	public code: string
}
