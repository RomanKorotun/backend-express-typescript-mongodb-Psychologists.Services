import express, { Router } from "express";
import { authenticate, isEmptyBody } from "../../middleware/index.js";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import {
  logout,
  signin,
  signup,
} from "../../controllers/auth-controller/index.js";
import { current } from "../../controllers/auth-controller/current.js";

const authRouter: Router = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  isValidBody(userSignupSchema),
  ctrlWrapper(signup)
);

authRouter.post(
  "/signin",
  isEmptyBody,
  isValidBody(userSigninSchema),
  ctrlWrapper(signin)
);

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.get("/current", authenticate, current);

export default authRouter;
