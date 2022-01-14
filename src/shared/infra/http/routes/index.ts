import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

// rentals
router.use("/rentals", rentalsRoutes);

// cars
router.use("/cars", carsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

// accounts
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };
