import express from "express";
import {
  getMeController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/me", getMeController);

export default authRoute;
