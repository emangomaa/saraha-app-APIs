import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connection from "./database/db.connection.js";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
import AppError from "./src/utils/appError.js";
import globalErrorHandler from "./src/utils/globalErrorHandler.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
connection();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.use("*", (req, res, next) => {
  next(new AppError("NOT FOUND!", 404));
});

app.use(globalErrorHandler);
app.listen(port, () => console.log(`Server Up and listening on port ${port}!`));
