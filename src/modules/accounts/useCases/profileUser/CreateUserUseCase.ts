import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

type IRequest = ICreateUserDto;

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 10);

    return this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
