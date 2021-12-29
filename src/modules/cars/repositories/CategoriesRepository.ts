import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from "./implementations/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }

  list(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDto): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }
}
