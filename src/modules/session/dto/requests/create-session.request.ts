import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class CreateSessionRequest {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'da5w6d45a6wd45a3' })
	public movieId: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: '48468wa4efg65aw4g' })
	public hallId: string

	@IsDateString()
	@IsNotEmpty()
	@ApiProperty({ example: '2026-03-23' })
	public startAt: string

	@IsDateString()
	@IsNotEmpty()
	@ApiProperty({ example: '2026-03-24' })
	public endAt: string
}
