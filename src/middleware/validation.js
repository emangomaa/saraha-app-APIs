import AppError from "../utils/appError.js";

export const validation = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
      next();
    } else {
      res.status(409).json({ message: "error", error: error.details });
    }
  };
};
