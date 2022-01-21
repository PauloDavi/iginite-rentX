import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IEmailProvider } from "@shared/container/providers/EmailProvider/IEmailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class SendForgotPasswordEmailUseCase {
  constructor(
    @inject("IUsersRepository")
    private usersRepository: IUsersRepository,
    @inject("IDateProvider")
    private dateProvider: IDateProvider,
    @inject("IUsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("IEmailProvider")
    private emailProvider: IEmailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: this.dateProvider.addHours(3),
    });

    await this.emailProvider.sendMail({
      to: email,
      subject: "recuperação de senha",
      templatePath: resolve(
        __dirname,
        "..",
        "..",
        "views",
        "emails",
        "forgotPassword.hbs"
      ),
      variables: {
        name: user.name,
        link: `${process.env.FORGOT_MAIL_URL}${token}`,
      },
    });
  }
}
