import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExist = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error("Category already exists");
    }

    return this.categoriesRepository.create({ name, description });
  }
}
