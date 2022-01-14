import { getRepository, Repository } from "typeorm";

import { ICreateCarImageDto } from "@modules/cars/dtos/ICreateCarImageDto";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

import { CarImage } from "../entities/CarImage";

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDto): Promise<CarImage> {
    const car_image = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(car_image);

    return car_image;
  }
}
