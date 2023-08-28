import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import handleError from "../../../middleware/handleError.js";
import AppError from "../../../utils/appError.js";
const signIn = handleError(async (req, res, next) => {
  let { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    if (user.verified === true) {
      let match = bcrypt.compareSync(password, user.password);
      if (match) {
        let token = Jwt.sign(
          { id: user._id, name: user.name },
          process.env.SECRET_KEY
        );
        let flag = 1;
        await userModel.findByIdAndUpdate(user._id, { loggedIn: true });
        res.json({ message: "success", token, flag });
      } else {
        next(new AppError("inCorrect Password!", 400));
      }
    } else {
      next(new AppError("verify email first!", 409));
    }
  } else {
    next(new AppError("user Not Found Register First!", 401));
  }
});

export default signIn;
