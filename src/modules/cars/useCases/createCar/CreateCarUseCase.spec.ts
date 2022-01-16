import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car: ICreateCarDto = {
      name: "Category test",
      description: "Category description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty("id");
  });

  it("should not be able to create a car with exist license plate", async () => {
    const car: ICreateCarDto = {
      name: "Category test",
      description: "Category description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    await createCarUseCase.execute(car);

    expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError("Car already exists")
    );
  });

  it("should be able to create a car with available true by default", async () => {
    const car: ICreateCarDto = {
      name: "Category test",
      description: "Category description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    };

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toEqual(true);
  });
});
