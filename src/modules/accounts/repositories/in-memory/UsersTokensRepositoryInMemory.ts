import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = [];

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
      created_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    this.userTokens.filter((userToken) => userToken.id !== id);
  }

  async findByToken(token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === token
    );
  }
}
