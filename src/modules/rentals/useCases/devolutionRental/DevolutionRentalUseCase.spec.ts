import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let devolutionRentalUseCase: DevolutionRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateFnsProvider: DateFnsProvider;

describe("Devolution rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateFnsProvider = new DateFnsProvider();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      dateFnsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    // const rental = await devolutionRentalUseCase.execute({
    //   id: "1234",
    //   user_id: "2345",
    // });
    // expect(rental).toHaveProperty("id");
    // expect(rental).toHaveProperty("start_date");
  });
});
