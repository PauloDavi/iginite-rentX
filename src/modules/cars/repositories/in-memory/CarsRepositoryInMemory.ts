import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { IListCarsDto } from "@modules/cars/dtos/IListCarsDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

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
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      brand,
      available: true,
      specifications,
      created_at: new Date(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({
    name,
    brand,
    category_id,
  }: IListCarsDto): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available)
      .filter((car) => (brand ? car.brand === brand : true))
      .filter((car) => (name ? car.name === name : true))
      .filter((car) => (category_id ? car.category_id === category_id : true));
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
