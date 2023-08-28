import mongoose from "mongoose";
/**
 * this function for connection with database
 * will be called in index.js file
 *
 */
const connection = () => {
  mongoose
    .connect(process.env.connectionURL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("connection Error ", err);
    });
};
export default connection;
