import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";

const passwordRoutes = Router();

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();

const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/reset", resetPasswordUserController.handle);
passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);

export { passwordRoutes };
