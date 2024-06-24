import express from "express";
import PostController from "./post_controller.js";
import { fileUpload } from "../../middlewares/uploadfile_middleware.js";

//initialize express router
const postRouter = express.Router();

//creating post controller instance
const postController = new PostController();

//localhost:3500/api/posts/
postRouter.get("/all", postController.getAllPosts);
postRouter.get("/filter", postController.filterPosts);
postRouter.get("/:id", postController.getById);
postRouter.get("/", postController.getUserPosts);
postRouter.post("/", fileUpload.single("imageUrl"), postController.newPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.put(
  "/:id",
  fileUpload.single("imageUrl"),
  postController.updatePost
);

export default postRouter;
