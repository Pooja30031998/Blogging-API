import CommentModel from "./comment_model.js";

export default class CommentController {
  getComments(req, res, next) {
    const postId = req.params.id;
    const comments = CommentModel.get(postId);
    res.status(200).send(comments);
  }
  postComment(req, res, next) {
    const postId = req.params.id;
    const userId = req.userId;
    const content = req.body.content;
    const commentAdded = CommentModel.post(userId, postId, content);
    res.status(201).send(commentAdded);
  }
  deleteComment(req, res, next) {
    const commentId = req.params.id;
    const userId = req.userId;
    const commentDeleted = CommentModel.delete(userId, commentId);
    res.status(201).send({ msg: "comment deleted" });
  }
  updateComment(req, res, next) {
    const commentId = req.params.id;
    const userId = req.userId;
    const content = req.body;
    const commentUpdated = CommentModel.update(userId, commentId, content);
    res.status(201).send(commentUpdated);
  }
}
