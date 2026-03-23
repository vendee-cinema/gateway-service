import { applyDecorators, UseGuards } from '@nestjs/common'
import type { Role } from '@vendee-cinema/contracts/account'

import { AuthGuard, RolesGuard } from '../guards'

import { Roles } from './roles.decorator'

export const Protected = (...roles: Role[]) => {
	if (!roles.length) return applyDecorators(UseGuards(AuthGuard))
	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
}
