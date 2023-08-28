import express from "express";
import auth from "../../middleware/auth.js";
import signUp from "./controller/signUp.js";
import signIn from "./controller/signIn.js";
import {
  verifyEmail,
  getSingleUser,
  logOut,
} from "./controller/user.controller.js";
import { validation } from "../../middleware/validation.js";
import { signInSchema, signUpSchema } from "./user.validation.js";

const app = express.Router();
// sign up
app.post("/signUp", validation(signUpSchema), signUp);
// sign in
app.post("/signIn", validation(signInSchema), signIn);

// verify email
app.get("/verify/:token", verifyEmail);

// get single user
app.get("/user", auth, getSingleUser);

// log out
app.put("/logOut", auth, logOut);
export default app;
