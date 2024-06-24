import ApplicationError from "../../middlewares/application_error.js";
import PostModel from "../posts/post_model.js";

export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
  static get(postId) {
    const allComments = comments.filter((c) => {
      return c.postId == postId;
    });
    if (allComments.length > 0) {
      return allComments;
    } else {
      throw new ApplicationError(400, "No Comments found for this post");
    }
  }

  static post(userId, postId, content) {
    const postIndex = PostModel.getAll().findIndex((p) => p.id == postId);
    if (postIndex == -1) {
      throw new ApplicationError(400, "No post of this postID found");
    } else {
      const newComment = new CommentModel(
        comments.length + 1,
        userId,
        postId,
        content
      );
      comments.push(newComment);
      return newComment;
    }
  }

  static delete(userId, commentId) {
    const commentIndex = comments.findIndex((c) => c.id == commentId);
    if (commentIndex == -1) {
      throw new ApplicationError(400, "No comment of this commentID found");
    }
    const index = comments.findIndex(
      (c) => c.id == commentId && c.userId == userId
    );
    if (index == -1) {
      throw new ApplicationError(
        400,
        "This comment is not posted by this user. Thus comment can't be deleted"
      );
    } else {
      comments.splice(index, 1);
    }
  }

  static update(userId, commentId, content) {
    const commentIndex = comments.findIndex((c) => c.id == commentId);
    if (commentIndex == -1) {
      throw new ApplicationError(400, "No comment of this commentID found");
    }
    const index = comments.findIndex(
      (c) => c.id == commentId && c.userId == userId
    );
    if (index == -1) {
      throw new ApplicationError(
        400,
        "This comment is not posted by this user. Thus comment can't be updated"
      );
    } else {
      comments[index] = { ...comments[index], ...content };
      return comments[index];
    }
  }
}

const comments = [
  new CommentModel(1, 1, 2, "Nice dog poster"),
  new CommentModel(2, 2, 1, "nice cat poster"),
];
