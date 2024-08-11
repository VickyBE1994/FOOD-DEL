import mongoose from "mongoose";

export const mongodbConnect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vickyvip81:admin123@cluster0.xi13exz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("db connected ");
    });
};
