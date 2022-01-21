import { inject, injectable } from "tsyringe";

import { IUserResponseDto } from "@modules/accounts/dtos/IUserResponseDto";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("IUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<IUserResponseDto> {
    const user = await this.usersRepository.findById(userId);

    return UserMap.toDto(user);
  }
}
