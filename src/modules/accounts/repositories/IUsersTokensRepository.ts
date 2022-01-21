import { ICreateUserTokenDto } from "../dtos/ICreateUserTokenDto";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
  create(props: ICreateUserTokenDto): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByToken(token: string): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
}
