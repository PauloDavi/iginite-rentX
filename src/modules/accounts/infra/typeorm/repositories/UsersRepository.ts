import { getRepository, Repository } from "typeorm";

import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDto): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      driver_license,
      avatar,
    });

    await this.repository.save(user);

    return user;
  }
}
