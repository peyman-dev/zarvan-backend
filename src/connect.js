import mongoose from "mongoose";

export default async function () {
  try {
    if (mongoose.connections[0].readyState) return;
    else
      await mongoose
        .connect("mongodb://localhost:27017/zarvan-backend")
        .then(() => {
          console.log("Database is connected successfully");
        })
        .catch((err) => {
          throw new Error(err);
        });
  } catch (error) {
    throw new Error(error);
  }
}
