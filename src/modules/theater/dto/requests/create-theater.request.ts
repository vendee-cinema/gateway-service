import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTheaterRequest {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Vendee' })
	public name: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Kyiv, Khreshchatyk st. 38' })
	public address: string
}
