import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsISO8601, IsOptional, IsString } from 'class-validator'

export class GetSessionsRequest {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional({
		description: 'Theater ID to filter sessions',
		example: 'g4ae98sf46ae54fdaw48'
	})
	public theaterId?: string

	@IsISO8601()
	@IsOptional()
	@ApiPropertyOptional({
		description: 'Target date (ISO or YYYY-MM-DD)',
		example: '2026-03-24'
	})
	public date?: string
}
