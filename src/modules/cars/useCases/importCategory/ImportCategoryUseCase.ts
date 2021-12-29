import { parse } from "csv-parse";
import fs from "fs";

import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<Category[]> {
    const categories = await this.loadCategories(file);

    const createdCategories = categories.map(({ name, description }) => {
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        return this.categoriesRepository.create({
          name,
          description,
        });
      }

      return null;
    });

    return createdCategories.filter(Boolean);
  }
}
