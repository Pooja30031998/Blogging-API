import PostModel from "./post_model.js";
import ApplicationError from "../../middlewares/application_error.js";

export default class PostController {
  getAllPosts(req, res, next) {
    const posts = PostModel.getAll();
    res.status(200).send(posts);
  }
  getById(req, res, next) {
    const id = req.params.id;
    const postFound = PostModel.get(id);
    return res.status(200).send(postFound);
  }
  getUserPosts(req, res, next) {
    const userId = req.userId;
    const userPosts = PostModel.getByUser(userId);
    return res.status(200).send(userPosts);
  }
  newPost(req, res, next) {
    const userId = req.userId;
    const caption = req.body.caption;
    const imageUrl = req.file.filename;
    const postAdded = PostModel.addPost(userId, caption, imageUrl);
    res.status(201).send(postAdded);
  }
  deletePost(req, res, next) {
    const userId = req.userId;
    const id = req.params.id;
    const deleted = PostModel.delete(id, userId);
    res.status(200).send(deleted);
  }
  updatePost(req, res, next) {
    const userId = req.userId;
    const id = req.params.id;
    const details = { caption: req.body.caption, imageUrl: req.file.filename };
    const updated = PostModel.update(id, userId, details);
    res.status(200).send(updated);
  }
  filterPosts(req, res) {
    const searchWord = req.query.search;
    const result = PostModel.filter(searchWord);
    res.status(200).send(result);
  }
}
