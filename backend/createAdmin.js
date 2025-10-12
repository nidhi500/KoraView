import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const resetPassword = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashed = await bcrypt.hash("admin1234", 10);
  await User.updateOne({ email: "admin@sikkim3601.com" }, { $set: { password: hashed } });
  console.log("Admin password reset successfully");
  process.exit(0);
};

resetPassword();
