import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsString, Validate } from 'class-validator'

import { IdentifierValidator } from '../../../../shared/validators'

export class SendOtpRequest {
	@IsString()
	@Validate(IdentifierValidator)
	@ApiProperty({ examples: ['johndoe@email.com', '+380123456789'] })
	public identifier: string

	@IsIn(['phone', 'email'])
	@ApiProperty({ examples: ['phone', 'email'], enum: ['phone', 'email'] })
	public type: 'phone' | 'email'
}
