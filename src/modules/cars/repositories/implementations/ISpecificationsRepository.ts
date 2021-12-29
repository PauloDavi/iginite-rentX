import { Specification } from "../../model/Specification";

export interface ICreateSpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  findByName(name: string): Specification;
  create(props: ICreateSpecificationDto): Specification;
}
