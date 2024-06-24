import LikeModel from "./like_model.js";

export default class LikeController {
  getByPostid(req, res, next) {
    const postId = req.params.id;
    const likesByPost = LikeModel.getLikes(postId);
    res.status(200).send(likesByPost);
  }
  toggleLikePost(req, res, next) {
    const postId = req.params.id;
    const userId = req.userId;
    const likeToggle = LikeModel.toggle(postId, userId);
    res.status(200).send(likeToggle);
  }
}
