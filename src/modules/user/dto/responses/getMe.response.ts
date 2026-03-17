import { ApiProperty } from '@nestjs/swagger'

export class GetMeResponse {
	@ApiProperty({ example: 'CtryhlknmL8nAEZOrhths' })
	public id: string

	@ApiProperty({ example: 'John Doe' })
	public name: string

	@ApiProperty({ example: 'johndoe@example.com' })
	public email: string

	@ApiProperty({ example: '+380123465789' })
	public phone: string

	@ApiProperty({
		example: 'https://cdn.vendee-cinema.com/users/e0db4163fc2aab147599c75090...'
	})
	public avatar: string
}
