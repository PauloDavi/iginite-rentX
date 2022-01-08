import { AppError } from "@errors/AppError";
import { ICreateCategoryDto } from "@modules/cars/dtos/ICreateCategoryDto";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: ICategoriesRepository;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category: ICreateCategoryDto = {
      name: "Category test",
      description: "Category description",
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    const category: ICreateCategoryDto = {
      name: "Category test",
      description: "Category description",
    };

    await createCategoryUseCase.execute(category);

    expect(createCategoryUseCase.execute(category)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
