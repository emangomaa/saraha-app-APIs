const globalErrorHandler = (err, req, res, next) => {
  if (process.env.MODE === "dev") {
    res.status(err.status).json({ err: err.message, stack: err.stack });
  } else {
    res.json({ err: err.message });
  }
};
export default globalErrorHandler;
