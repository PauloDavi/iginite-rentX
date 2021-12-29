import { Category } from "../../model/Category";

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(props: ICreateCategoryDto): Category;
}
