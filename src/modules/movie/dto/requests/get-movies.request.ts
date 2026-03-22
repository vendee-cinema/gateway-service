import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
	IsBoolean,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min
} from 'class-validator'

export class GetMoviesRequest {
	@IsString()
	@IsOptional()
	@Transform(({ value }) => value.toString().trim())
	@ApiPropertyOptional({ example: 'classic' })
	public category: string

	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => {
		if (value === 'true') return true
		if (value === 'false') return false
		return value
	})
	@ApiPropertyOptional({ example: true })
	public random: boolean

	@IsInt()
	@IsOptional()
	@Min(1)
	@Max(100)
	@Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
	@ApiPropertyOptional({ example: 13 })
	public limit: number
}
