import { ICreateCategoryDto } from "../dtos/ICreateCategoryDto";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(props: ICreateCategoryDto): Promise<Category>;
}
