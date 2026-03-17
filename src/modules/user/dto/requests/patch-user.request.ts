import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PatchUserRequest {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'John Doe' })
	public name: string
}
