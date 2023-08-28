import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    messageText: {
      type: String,
      require: true,
    },
    receivedId: { type: Types.ObjectId, ref: "user", require: true },
  },
  {
    timestamps: true,
  }
);

const messageModel = model("message", messageSchema);

export default messageModel;
