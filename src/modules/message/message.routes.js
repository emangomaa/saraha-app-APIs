import express from "express";
import auth from "./../../middleware/auth.js";
import { addMessage, getUserMessages } from "./message.controller.js";
const app = express.Router();
// add message
app.post("/", addMessage);
// get user messages
app.get("/", auth, getUserMessages);
export default app;
