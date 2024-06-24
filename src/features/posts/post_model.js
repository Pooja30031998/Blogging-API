import ApplicationError from "../../middlewares/application_error.js";

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }
  static getAll() {
    return posts;
  }

  static get(id) {
    const post = posts.find((p) => p.id == id);
    if (post) {
      return post;
    } else {
      throw new ApplicationError(400, "post not found");
    }
  }

  static getByUser(userId) {
    const userPosts = posts.filter((p) => {
      return p.userId == userId;
    });
    if (!userPosts || !userPosts.length > 0) {
      throw new ApplicationError(400, "No posts found for this user");
    } else {
      return userPosts;
    }
  }

  static addPost(userId, caption, imageUrl) {
    const newPost = new PostModel(posts.length + 1, userId, caption, imageUrl);
    posts.push(newPost);
    return newPost;
  }

  static delete(id, userId) {
    const postIndex = posts.findIndex((p) => p.id == id && p.userId == userId);
    if (postIndex >= 0) {
      posts.splice(postIndex, 1);
      return "post deleted";
    } else {
      throw new ApplicationError(
        400,
        "Post not found (or) Post not posted by this user"
      );
    }
  }

  static update(id, userId, details) {
    const postIndex = posts.findIndex((p) => p.id == id && p.userId == userId);
    if (postIndex >= 0) {
      posts[postIndex] = { ...posts[postIndex], ...details };
      console.log(posts);
      return posts[postIndex];
    } else {
      throw new ApplicationError(
        400,
        "Post not found (or) Post not posted by this user"
      );
    }
  }

  static filter(searchWord) {
    const result = posts.filter((p) => {
      const postCaption = p.caption.toLowerCase().trim();
      if (postCaption.includes(searchWord.toLowerCase().trim())) {
        return p;
      }
    });
    if (result.length == 0) {
      throw new ApplicationError(400, "No posts found for the search term");
    } else {
      return result;
    }
  }
}

const posts = [
  new PostModel(
    1,
    1,
    "Cat Poster",
    "https://m.media-amazon.com/images/I/41apP5NlxlL._SX300_SY300_QL70_FMwebp_.jpg"
  ),
  new PostModel(
    2,
    2,
    "Dog Poster",
    "https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/b/q/n/large-dog-poster-for-room-wall-decoration-size-12-x-18-inches-eb-original-imagubg295dehqwj.jpeg?q=90&crop=false"
  ),
];
