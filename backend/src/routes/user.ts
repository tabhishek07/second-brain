import { Router } from "express";
import dotenv from "dotenv";
import { loginHandler, signupHandler } from "../controllers/userController.js";
const userRouter = Router();



userRouter.post("signup", signupHandler);
userRouter.post("/login", loginHandler);

export {
    userRouter
}