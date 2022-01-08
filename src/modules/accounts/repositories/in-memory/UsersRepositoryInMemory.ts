import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
      created_at: new Date(),
    });

    this.users.push(user);

    return user;
  }
}
