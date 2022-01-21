import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IEmailProvider } from "@shared/container/providers/EmailProvider/IEmailProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("IUsersRepository")
    private usersRepository: IUsersRepository,
    @inject("IDateProvider")
    private dateProvider: IDateProvider,
    @inject("IUsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("IEmailProvider")
    private emailProvider: IEmailProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    if (this.dateProvider.compareIsBefore(userToken.expires_date, new Date())) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 10);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
