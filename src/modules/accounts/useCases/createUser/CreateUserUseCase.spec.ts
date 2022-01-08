import { AppError } from "@errors/AppError";
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe("Create user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user: ICreateUserDto = {
      name: "Category test",
      email: "test@gmail.com",
      password: "123456",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

    expect(createdUser).toHaveProperty("id");
  });

  it("should not be able to create a new user with email exists", async () => {
    const user: ICreateUserDto = {
      name: "Category test",
      email: "test@gmail.com",
      password: "123456",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    expect(createUserUseCase.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
