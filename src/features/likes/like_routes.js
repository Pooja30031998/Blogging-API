import express from "express";
import LikeController from "./like_controller.js";

//initialize express router
const likeRouter = express.Router();

//creating like controller instance
const likeController = new LikeController();

//localhost:3500/api/likes/
likeRouter.get("/:id", likeController.getByPostid);
likeRouter.get("/toggle/:id", likeController.toggleLikePost);

export default likeRouter;
