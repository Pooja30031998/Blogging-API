import UserModel from "./user_model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signup(req, res, next) {
    const { name, email, password } = req.body;
    const userAdded = UserModel.add(name, email, password);
    return res.status(201).send(userAdded);
  }
  signin(req, res, next) {
    const { email, password } = req.body;
    const userFound = UserModel.checkUser(email, password);
    if (userFound) {
      const token = jwt.sign(
        { userId: userFound.id, email: email },
        "jABQyu6Mjw4FIl6T9E7GKdeAiM3Td6hH"
      );
      res.cookie("jwtToken", token, { maxAge: 2 * 24 * 60 * 60 * 1000 });
      return res.status(200).send(token);
    }
  }

  signout(req, res, next) {
    if (req.cookies.jwtToken) {
      res.clearCookie("jwtToken");
      res.status(200).send("signed out");
    } else {
      res.status(404).send("You haven't signed in yet");
    }
  }
}
