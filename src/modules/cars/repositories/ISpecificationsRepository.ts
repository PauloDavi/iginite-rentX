import { ICreateSpecificationDto } from "../dtos/ICreateSpecificationDto";
import { Specification } from "../infra/typeorm/entities/Specification";

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create(props: ICreateSpecificationDto): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
