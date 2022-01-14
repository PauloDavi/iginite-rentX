import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List available cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "SUV",
      description: "SUV de teste",
      daily_rate: 100,
      license_plate: "AD",
      fine_amount: 10,
      brand: "Audi",
      category_id: "250e5413-19f2-4798-ab51-2d61eac8f197",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "SUV",
      description: "SUV de teste",
      daily_rate: 100,
      license_plate: "AD",
      fine_amount: 10,
      brand: "Audi",
      category_id: "250e5413-19f2-4798-ab51-2d61eac8f197",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "SUV",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "SUV",
      description: "SUV de teste",
      daily_rate: 100,
      license_plate: "AD",
      fine_amount: 10,
      brand: "Audi",
      category_id: "250e5413-19f2-4798-ab51-2d61eac8f197",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Audi",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "SUV",
      description: "SUV de teste",
      daily_rate: 100,
      license_plate: "AD",
      fine_amount: 10,
      brand: "Audi",
      category_id: "250e5413-19f2-4798-ab51-2d61eac8f197",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "250e5413-19f2-4798-ab51-2d61eac8f197",
    });

    expect(cars).toEqual([car]);
  });
});
