import userModel from "../../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../../../email/sendEmail.js";
import Jwt from "jsonwebtoken";
import handleError from "../../../middleware/handleError.js";
import AppError from "../../../utils/appError.js";

const signUp = handleError(async (req, res, next) => {
  let { name, email, password, age } = req.body;
  const existUser = await userModel.findOne({ email });

  if (existUser) next(new AppError("User Already Exist!", 401));
  const hashPassword = bcrypt.hashSync(password, Number(process.env.ROUNDS));
  const user = await userModel.insertMany({
    name,
    email,
    password: hashPassword,
    age,
  });
  let verifyEmailToken = Jwt.sign(
    { id: user[0]._id },
    process.env.EMAIL_SECRET_KEY
  );
  sendEmail({
    email,
    name,
    api: `http://localhost:3000/api/v1/users/verify/${verifyEmailToken}`,
  });
  res.json({ message: "success", user });
});

export default signUp;

// password-confirm : Joi.any().equal(Joi.ref('password')).required()
// password-confirm : Joi.any().valid(Joi.ref('password')).required()
