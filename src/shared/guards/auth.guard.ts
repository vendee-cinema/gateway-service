import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { PassportService } from '@vendee-cinema/passport'
import type { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly passportService: PassportService) {}

	private extractToken(request: Request) {
		const header = request.headers.authorization
		if (!header)
			throw new UnauthorizedException('Authorization header is missing')
		if (!header.startsWith('Bearer '))
			throw new UnauthorizedException('Invalid authorization header')
		const token = header.replace(/^Bearer\s+/i, '').trim()
		return token
	}

	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()
		const token = this.extractToken(request)
		if (!token) throw new UnauthorizedException('Token is not provided')
		const result = this.passportService.verify(token)
		if (!result.valid) throw new UnauthorizedException(result.reason)
		request.user = { id: result.userId }
		return true
	}
}
