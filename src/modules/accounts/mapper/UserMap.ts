import { instanceToInstance } from "class-transformer";

import { IUserResponseDto } from "../dtos/IUserResponseDto";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  static toDto({
    name,
    email,
    id,
    driver_license,
    avatar,
    created_at,
    avatar_url,
  }: User): IUserResponseDto {
    const user = instanceToInstance({
      name,
      email,
      id,
      driver_license,
      avatar,
      created_at,
      avatar_url,
    });

    return user;
  }
}
