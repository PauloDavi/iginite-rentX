/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";

import { AppError } from "@errors/AppError";
import { router } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      message: `Internal server error - ${error.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is listem in port 3333"));
