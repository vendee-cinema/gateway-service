import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateNested
} from 'class-validator'

export enum SeatType {
	CHAIR = 'chair',
	SOFA2 = 'sofa2',
	SOFA3 = 'sofa3'
}

export class Row {
	@IsInt()
	@IsNotEmpty()
	@ApiProperty({ example: 1 })
	public row: number

	@IsInt()
	@IsNotEmpty()
	@ApiProperty({ example: 15 })
	public columns: number

	@IsEnum(SeatType)
	@IsNotEmpty()
	@ApiProperty({ example: SeatType.CHAIR, enum: SeatType })
	public type: SeatType

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ example: 300 })
	public price: number
}

export class CreateHallRequest {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Hall 1' })
	public name: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Y8J--Ppg6ouUOOJOEIINs' })
	public theaterId: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Row)
	public rows: Row[]
}
