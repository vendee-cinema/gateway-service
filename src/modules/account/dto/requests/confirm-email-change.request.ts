import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator'

export class ConfirmEmailChangeRequest {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ example: 'johndoe@vendee.com' })
	public email: string

	@IsNumberString()
	@IsNotEmpty()
	@ApiProperty({ example: '123456' })
	@Length(6, 6)
	public code: string
}
