import messageModel from "../../../database/models/message.model.js";
import userModel from "../../../database/models/user.model.js";
import handleError from "../../middleware/handleError.js";
import AppError from "../../utils/appError.js";
const addMessage = handleError(async (req, res, next) => {
  let { messageText, receivedId } = req.body;
  const user = await userModel.findById(receivedId);
  if (user) {
    let addedMessage = await messageModel.insertMany({
      messageText,
      receivedId,
    });
    addedMessage.length > 0
      ? res.json({ messsage: "success", addedMessage })
      : next(new AppError("valid to send ", 409));
  } else {
    next(new AppError("user Not Found", 400));
  }
});

const getUserMessages = handleError(async (req, res, next) => {
  let messages = await messageModel.find({ receivedId: req.userId });
  messages.length > 0
    ? res.json({ message: "success", messages })
    : next(new AppError("Not Found ", 404));
});
export { addMessage, getUserMessages };
