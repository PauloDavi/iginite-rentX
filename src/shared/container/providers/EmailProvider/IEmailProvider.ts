import { ISendMailProps } from "./ISendMailProps";

export interface IEmailProvider {
  sendMail(props: ISendMailProps): Promise<void>;
}
