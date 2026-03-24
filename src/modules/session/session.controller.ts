import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query
} from '@nestjs/common'

import { CreateSessionRequest, GetSessionsRequest } from './dto'
import { GetSessionsByMovieRequest } from './dto/requests/get-sessions-by-movie.request'
import { SessionClientGrpc } from './session.grpc'

@Controller('sessions')
export class SessionController {
	public constructor(private readonly session: SessionClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(@Query() dto: GetSessionsRequest) {
		const { sessions } = await this.session.call('listSessions', dto)
		return Array.isArray(sessions) ? sessions : []
	}

	@Get('movie/:movieId')
	@HttpCode(HttpStatus.OK)
	public async getByMovie(
		@Param('movieId') movieId: string,
		@Query() dto: GetSessionsByMovieRequest
	) {
		const { date } = dto
		const { sessions } = await this.session.call('listSessionsByMovie', {
			movieId,
			date
		})
		return Array.isArray(sessions) ? sessions : []
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		const { session } = await this.session.call('getSession', { id })
		return session
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	// @Protected(Role.ADMIN)
	public async create(@Body() dto: CreateSessionRequest) {
		return await this.session.call('createSession', dto)
	}
}
