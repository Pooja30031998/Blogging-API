import jwt from "jsonwebtoken";
import ApplicationError from "../middlewares/application_error.js";

const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    throw new ApplicationError(401, "Unauthorized");
  }
  try {
    const payload = jwt.verify(token, "jABQyu6Mjw4FIl6T9E7GKdeAiM3Td6hH");
    req.userId = payload.userId;
  } catch (err) {
    throw new ApplicationError(401, "Unauthorized");
  }
  next();
};

export default jwtAuth;
