import express from "express";
import BookmarkController from "./bookmarks_controller.js";

//initialize express router
const bookmarkRouter = express.Router();

//creating Bookmark controller instance
const bookmarkController = new BookmarkController();

//localhost:3500/api/bookmarks/
bookmarkRouter.get("/", bookmarkController.getByUser);
bookmarkRouter.get("/toggle/:id", bookmarkController.toggleBookmarkPost);

export default bookmarkRouter;
