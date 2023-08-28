import userModel from "../../../../database/models/user.model.js";
import jwt from "jsonwebtoken";
import handleError from "../../../middleware/handleError.js";
import AppError from "../../../utils/appError.js";
const verifyEmail = handleError(async (req, res, next) => {
  let { token } = req.params;
  jwt.verify(token, process.env.EMAIL_SECRET_KEY, async (err, decoded) => {
    if (err) next(new AppError("Invalid Token", 400));
    let user = await userModel.findByIdAndUpdate(
      decoded.id,
      { verified: true },
      { new: true }
    );
    // res.json({ message: "success" });
    res.send(`<div>
  <h3>Email Verivied Successfully</h3>
  <a href="http://localhost:3001/login">Login</a>
</div>`);
  });
});

const getSingleUser = handleError(async (req, res, next) => {
  let user = await userModel.findById(req.userId);
  user
    ? res.json({ message: "success", user })
    : next(new AppError("User Not Exist!", 404));
});

// log out
const logOut = handleError(async (req, res, next) => {
  let user = await userModel.findByIdAndUpdate(
    req.userId,
    { loggedIn: false },
    { new: true }
  );
  let flag = 0;
  user
    ? res.json({ message: "success", user, flag })
    : next(new AppError("User Not Exist!", 404));
});
export { verifyEmail, getSingleUser, logOut };
