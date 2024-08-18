import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  if (!db) throw new Error();
  console.log("db connected");
};
