import {
	ValidationArguments,
	ValidatorConstraint,
	type ValidatorConstraintInterface
} from 'class-validator'

import { SendOtpRequest } from '../../modules/auth/dto'

@ValidatorConstraint({ name: 'IdentifierValidator', async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
	public validate(value: string, args: ValidationArguments): boolean {
		const object = args.object as SendOtpRequest

		if (object.type === 'EMAIL')
			return (
				typeof value === 'string' &&
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
			)
		else if (object.type === 'PHONE')
			return typeof value === 'string' && /^\+[1-9]\d{1,14}$/.test(value)

		return false
	}

	public defaultMessage(args: ValidationArguments): string {
		const object = args.object as SendOtpRequest

		if (object.type === 'EMAIL')
			return 'Identifier must be a valid email address'
		else if (object.type === 'PHONE')
			return 'Identifier must be a valid phone number'

		return 'Invalid identifier'
	}
}
