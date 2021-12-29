import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExist =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error("Specification already exists");
    }

    return this.specificationsRepository.create({ name, description });
  }
}
