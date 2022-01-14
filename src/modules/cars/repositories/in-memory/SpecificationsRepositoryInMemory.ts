import { ICreateSpecificationDto } from "@modules/cars/dtos/ICreateSpecificationDto";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDto): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}
