import jwt from "jsonwebtoken";
import userModel from "../../database/models/user.model.js";
import AppError from "../utils/appError.js";
const auth = (req, res, next) => {
  let token = req.header("token");
  if (!token) {
    next(new AppError("Token not found", 404));
  } else {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        next(new AppError("Invalied Token", 401));
      }
      let user = await userModel.findById(decoded.id);
      if (user.verify === false) {
        next(new AppError("verify Email", 401));
      }
      if (!user || (user && user.loggedIn === false)) {
        next(new AppError("Log In First!", 401));
      }
      req.userId = user._id;
      next();
    });
  }
};
export default auth;
