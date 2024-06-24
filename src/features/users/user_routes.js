import express from "express";
import UserController from "./user_controller.js";

//initialize express router
const userRouter = express.Router();

//creating user controller instance
const userController = new UserController();

//localhost:3500/api/users/
userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);
userRouter.post("/signout", userController.signout);

export default userRouter;
