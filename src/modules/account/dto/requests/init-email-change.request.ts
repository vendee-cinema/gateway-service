import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class InitEmailChangeRequest {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ example: 'johndoe@vendee.com' })
	public email: string
}
