import { addHours } from "date-fns";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateFnsProvider: DateFnsProvider;

describe("Create rental", () => {
  const dayAdd25Hours = addHours(new Date(), 25);

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateFnsProvider = new DateFnsProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateFnsProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "2345",
      expected_return_date: dayAdd25Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      car_id: "12345",
      user_id: "2345",
      expected_return_date: dayAdd25Hours,
    });

    expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "2345",
        expected_return_date: dayAdd25Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "12345",
      expected_return_date: dayAdd25Hours,
    });

    expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "2345",
        expected_return_date: dayAdd25Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "2345",
        expected_return_date: new Date(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
