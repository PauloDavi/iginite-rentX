import { getRepository, Repository } from "typeorm";

import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { IListCarsDto } from "@modules/cars/dtos/IListCarsDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    license_plate,
    fine_amount,
    description,
    daily_rate,
    category_id,
    brand,
    specifications,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      brand,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable({
    name,
    brand,
    category_id,
  }: IListCarsDto): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }
}
