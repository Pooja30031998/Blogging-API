//3rd party imports
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//internal imports
import jwtAuth from "./src/middlewares/jwt_middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger_middleware.js";
import ApplicationError from "./src/middlewares/application_error.js";
import postRouter from "./src/features/posts/post_routes.js";
import userRouter from "./src/features/users/user_routes.js";
import commentRouter from "./src/features/comments/comment_routes.js";
import likeRouter from "./src/features/likes/like_routes.js";
import bookmarkRouter from "./src/features/bookmarks/bookmark_routes.js";

//creating server
const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());

//routes
//localhost:3500/

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use(loggerMiddleware);
server.use("/api/users", userRouter);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likeRouter);
server.use("/api/bookmarks", jwtAuth, bookmarkRouter);

//default request handler
server.get("/", (req, res) => {
  res.send("welcome to social networking platform API");
});

//Handling errors
server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  } else {
    console.log(err);
    res.status(500).send("Something went wrong. Please try again later");
  }
  next();
});

//middleware to handle 404 requests
server.use((req, res) => {
  res.status(404).send("API not found");
});

server.listen(3500, () => {
  console.log("server is listening to port 3500");
});
