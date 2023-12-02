import mongoose from "mongoose";
const DB_URL =
  "mongodb+srv://sak:bGtW3KvbMYcglFoX@cluster0.7cubqyw.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    const connect = await mongoose.connect(DB_URL);
    if (connect) {
      console.log("Connection successful");
    } else {
      console.log("error");
    }
  } catch (err) {
    throw err;
  }
};
export default connect;
