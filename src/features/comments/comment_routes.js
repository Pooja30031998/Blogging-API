import express from "express";
import CommentController from "./comment_controller.js";

//initialize express router
const commentRouter = express.Router();

//creating comment controller instance
const commentController = new CommentController();

//localhost:3500/api/comments/
commentRouter.get("/:id", commentController.getComments);
commentRouter.post("/:id", commentController.postComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.put("/:id", commentController.updateComment);

export default commentRouter;
