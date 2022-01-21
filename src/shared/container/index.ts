import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<ICarsRepository>("ICarsRepository", CarsRepository);

container.registerSingleton<ICategoriesRepository>(
  "ICategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "ISpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "IUsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsImagesRepository>(
  "ICarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "IRentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "IUsersTokensRepository",
  UsersTokensRepository
);
