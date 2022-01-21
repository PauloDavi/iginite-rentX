import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("IDateProvider")
    private dateProvider: IDateProvider,
    @inject("IUsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub: user_id, email } = verify(
      token,
      auth.secretRefreshToken
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secretRefreshToken, {
      subject: user_id,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: this.dateProvider.addDays(auth.expiresRefreshTokenDays),
    });

    const newToken = sign({}, auth.secretToken, {
      subject: user_id,
      expiresIn: auth.expiresInToken,
    });

    return { token: newToken, refresh_token };
  }
}
