import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";

import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EmailProvider } from "./EmailProvider/implementations/EmailProvider";
import { SESMailProvider } from "./EmailProvider/implementations/SESMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("IDateProvider", DateFnsProvider);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "IStorageProvider",
  diskStorage[process.env.DISK_PROVIDER]
);

const mailStorage = {
  local: container.resolve(EmailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IEmailProvider>(
  "IEmailProvider",
  mailStorage[process.env.MAIL_PROVIDER]
);
