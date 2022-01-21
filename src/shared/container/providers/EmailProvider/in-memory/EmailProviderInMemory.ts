import { IEmailProvider } from "../IEmailProvider";
import { ISendMailProps } from "../ISendMailProps";

export class EmailProviderInMemory implements IEmailProvider {
  emails: any[] = [];

  async sendMail({
    to,
    subject,
    variables,
    templatePath,
  }: ISendMailProps): Promise<void> {
    this.emails.push({
      to,
      subject,
      variables,
      templatePath,
    });
  }
}
