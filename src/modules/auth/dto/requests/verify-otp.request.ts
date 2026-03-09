import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsNumberString, IsString, Length, Validate } from 'class-validator'

import { IdentifierValidator } from '@/shared/validators'

export class VerifyOtpRequest {
	@IsString()
	@Validate(IdentifierValidator)
	@ApiProperty({ examples: ['johndoe@email.com', '+380123456789'] })
	public identifier: string

	@IsIn(['phone', 'email'])
	@ApiProperty({ examples: ['phone', 'email'], enum: ['phone', 'email'] })
	public type: 'phone' | 'email'

	@IsNumberString()
	@IsNotEmpty()
	@ApiProperty({ example: '123456' })
	@Length(6, 6)
	public code: string
}
