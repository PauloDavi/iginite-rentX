import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response) {
    const { file } = request;

    const categories = await this.importCategoryUseCase.execute(file);

    return response.status(201).json(categories);
  }
}
