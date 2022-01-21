import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("IUsersRepository")
    private usersRepository: IUsersRepository,
    @inject("IDateProvider")
    private dateProvider: IDateProvider,
    @inject("IUsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    const token = sign({}, auth.secretToken, {
      subject: user.id,
      expiresIn: auth.expiresInToken,
    });

    const refresh_token = sign({ email }, auth.secretRefreshToken, {
      subject: user.id,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(auth.expiresRefreshTokenDays),
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };
  }
}
