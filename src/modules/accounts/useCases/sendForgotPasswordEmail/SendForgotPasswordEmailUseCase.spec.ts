import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";
import { IEmailProvider } from "@shared/container/providers/EmailProvider/IEmailProvider";
import { EmailProviderInMemory } from "@shared/container/providers/EmailProvider/in-memory/EmailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepositoryInMemory: IUsersRepository;
let dateProvider: IDateProvider;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let emailProviderInMemory: IEmailProvider;

describe("Send forgot password", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DateFnsProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    emailProviderInMemory = new EmailProviderInMemory();
    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepositoryInMemory,
      dateProvider,
      usersTokensRepositoryInMemory,
      emailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(emailProviderInMemory, "sendMail");

    const user = await usersRepositoryInMemory.create({
      driver_license: "11245",
      email: "doborlup@lagufgu.bt",
      name: "Kyle Anderson",
      password: "1234",
    });

    await sendForgotPasswordEmailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordEmailUseCase.execute("fakeEmail")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an user token", async () => {
    const createToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

    const user = await usersRepositoryInMemory.create({
      driver_license: "11245",
      email: "doborlup@lagufgu.bt",
      name: "Kyle Anderson",
      password: "1234",
    });

    await sendForgotPasswordEmailUseCase.execute(user.email);

    expect(createToken).toHaveBeenCalledTimes(1);
  });
});
