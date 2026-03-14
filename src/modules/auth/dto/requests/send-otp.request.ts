import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsString, Validate } from 'class-validator'

import { IdentifierValidator } from '../../../../shared/validators'

export class SendOtpRequest {
	@IsString()
	@Validate(IdentifierValidator)
	@ApiProperty({ examples: ['johndoe@email.com', '+380123456789'] })
	public identifier: string

	@IsIn(['PHONE', 'EMAIL'])
	@ApiProperty({ examples: ['PHONE', 'EMAIL'], enum: ['PHONE', 'EMAIL'] })
	public type: 'PHONE' | 'EMAIL'
}
