import BookmarkModel from "./bookmarks_model.js";

export default class BookmarkController {
  getByUser(req, res, next) {
    const userId = req.userId;
    const bookmarkedPosts = BookmarkModel.get(userId);
    res.status(200).send(bookmarkedPosts);
  }
  toggleBookmarkPost(req, res, next) {
    const postId = req.params.id;
    const userId = req.userId;
    const bookmarkToggle = BookmarkModel.toggle(postId, userId);
    res.status(200).send(bookmarkToggle);
  }
}
