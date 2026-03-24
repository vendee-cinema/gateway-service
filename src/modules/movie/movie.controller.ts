import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Query
} from '@nestjs/common'

import { GetMoviesRequest } from './dto'
import { MovieClientGrpc } from './movie.grpc'
import { MovieMapper } from './movie.mapper'

@Controller('movies')
export class MovieController {
	public constructor(private readonly movie: MovieClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(@Query() dto: GetMoviesRequest) {
		const { movies } = await this.movie.call('listMovies', dto)
		return Array.isArray(movies)
			? movies.map(movie => MovieMapper.toMovie(movie))
			: []
	}

	@Get(':slug')
	@HttpCode(HttpStatus.OK)
	public async getBySlug(@Param('slug') slug: string) {
		const { movie } = await this.movie.call('getMovie', { slug })
		return MovieMapper.toMovie(movie)
	}
}
