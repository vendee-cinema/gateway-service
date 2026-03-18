import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Role } from '@vendee-cinema/contracts/gen/account'

import { AccountClientGrpc } from '@/modules/account'

import { ROLES_KEY } from '../decorators'

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (!required || !required.length) return true

		const request = context.switchToHttp().getRequest()
		const { user } = request
		if (!user) throw new ForbiddenException('User context is missing')

		const account = await this.accountClient.call('getAccount', { id: user.id })
		if (!account) throw new NotFoundException('Account not found')

		if (!required.includes(account.role))
			throw new ForbiddenException(
				'You do not have the permission to access this resource'
			)

		return true
	}
}
