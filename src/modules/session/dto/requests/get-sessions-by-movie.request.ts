import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsOptional } from 'class-validator'

export class GetSessionsByMovieRequest {
	@IsDateString()
	@IsOptional()
	@ApiPropertyOptional({ example: '2026-03-23' })
	public date: string
}
