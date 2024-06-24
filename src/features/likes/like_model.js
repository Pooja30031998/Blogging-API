import ApplicationError from "../../middlewares/application_error.js";
import PostModel from "../posts/post_model.js";

export default class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }
  static getLikes(postId) {
    const postIndex = PostModel.getAll().findIndex((p) => p.id == postId);
    if (postIndex == -1) {
      throw new ApplicationError(400, "No post of this postID found");
    }
    const allLikes = likes.filter((l) => {
      return l.postId == postId;
    });
    if (allLikes.length == 0) {
      throw new ApplicationError(400, "No likes found for the given post ID");
    } else {
      return allLikes;
    }
  }

  static toggle(postId, userId) {
    const postIndex = PostModel.getAll().findIndex((p) => p.id == postId);
    if (postIndex == -1) {
      throw new ApplicationError(400, "No post of this postID found");
    }
    const likeIndex = likes.findIndex(
      (l) => l.postId == postId && l.userId == userId
    );
    if (likeIndex == -1) {
      const postLike = new LikeModel(likes.length + 1, userId, postId);
      likes.push(postLike);
      return `post: ${postId} liked`;
    } else {
      likes.splice(likeIndex, 1);
      return `Like removed for post: ${postId}`;
    }
  }
}

const likes = [new LikeModel(1, 1, 2), new LikeModel(2, 2, 1)];
