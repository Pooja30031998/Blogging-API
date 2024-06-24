import ApplicationError from "../../middlewares/application_error.js";

export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static getAll() {
    return users;
  }
  static add(name, email, password) {
    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
    return newUser;
  }
  static checkUser(email, password) {
    const userFound = users.find(
      (u) => u.email == email && u.password == password
    );
    if (!userFound) {
      throw new ApplicationError(400, "Invalid Credentials");
    } else {
      return userFound;
    }
  }
}

const users = [
  new UserModel(1, "anand", "anand@gmail.com", "anand123"),
  new UserModel(2, "akash", "akash@gmail.com", "akash123"),
];
