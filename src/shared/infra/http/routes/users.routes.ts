import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ProfileUserController } from "@modules/accounts/useCases/createUser/ProfileUserController";
import { CreateUserController } from "@modules/accounts/useCases/profileUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const uploadAvatar = multer(uploadConfig);

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
