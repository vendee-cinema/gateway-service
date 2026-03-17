import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import type {
	GetMeRequest,
	PatchUserRequest,
	UserServiceClient
} from '@vendee-cinema/contracts/gen/user'

@Injectable()
export class UserClientGrpc implements OnModuleInit {
	private userService: UserServiceClient

	public constructor(
		@Inject('USER_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.userService = this.client.getService<UserServiceClient>('UserService')
	}

	public getMe(request: GetMeRequest) {
		return this.userService.getMe(request)
	}

	public patch(request: PatchUserRequest) {
		return this.userService.patchUser(request)
	}
}
