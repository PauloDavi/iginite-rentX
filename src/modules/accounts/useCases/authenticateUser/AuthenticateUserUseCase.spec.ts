import { AppError } from "@errors/AppError";
import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: IDateProvider;
let usersTokensRepositoryInMemory: IUsersTokensRepository;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DateFnsProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      dateProvider,
      usersTokensRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDto = {
      name: "Category test",
      email: "test@gmail.com",
      password: "123456",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    const authInfo = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authInfo).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "test@gmail.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 401));
  });

  it("should not be able to authenticate a user with wrong password", async () => {
    const user: ICreateUserDto = {
      name: "Category test",
      email: "test@gmail.com",
      password: "123456",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 401));
  });

  it("should not be able to authenticate a user with wrong email", async () => {
    const user: ICreateUserDto = {
      name: "Category test",
      email: "test@gmail.com",
      password: "123456",
      driver_license: "AB",
    };

    await createUserUseCase.execute(user);

    await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "incorrectEmail",
        password: user.password,
      })
    ).rejects.toEqual(new AppError("Email or password incorrect", 401));
  });
});
