import ApplicationError from "../../middlewares/application_error.js";
import PostModel from "../posts/post_model.js";

export default class BookmarkModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }
  static get(userId) {
    const bookmarkedPosts = bookmarks.filter((b) => {
      return b.userId == userId;
    });
    if (bookmarkedPosts.length == 0) {
      throw new ApplicationError(400, "No bookmarked posts found");
    } else {
      return bookmarkedPosts;
    }
  }

  static toggle(postId, userId) {
    const postIndex = PostModel.getAll().findIndex((p) => p.id == postId);
    if (postIndex == -1) {
      throw new ApplicationError(400, "No post of this postID found");
    }
    const bookmarkIndex = bookmarks.findIndex(
      (b) => b.postId == postId && b.userId == userId
    );
    if (bookmarkIndex == -1) {
      const postBookmark = new BookmarkModel(
        bookmarks.length + 1,
        userId,
        postId
      );
      bookmarks.push(postBookmark);
      return `post: ${postId} bookmarked`;
    } else {
      bookmarks.splice(bookmarkIndex, 1);
      return `Bookmark removed for post: ${postId}`;
    }
  }
}

const bookmarks = [new BookmarkModel(1, 1, 2), new BookmarkModel(2, 2, 1)];
