import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IEmailProvider } from "../IEmailProvider";
import { ISendMailProps } from "../ISendMailProps";

@injectable()
export class SESMailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({
    to,
    subject,
    variables,
    templatePath,
  }: ISendMailProps): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <paulodavi.alencar@paulodavi.me>",
      subject,
      html: templateHTML,
    });
  }
}
