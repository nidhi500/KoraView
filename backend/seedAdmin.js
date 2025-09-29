// seedAdmin.js
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const createAdmin = async () => {
  const existing = await User.findOne({ email: "admin@sikkim360.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const admin = new User({
    name: "Admin",
    email: "admin@sikkim360.com",
    password: "admin1234", // Will be hashed automatically
    role: "admin"
  });

  await admin.save();
  console.log("Admin created successfully");
  process.exit(0);
};

createAdmin();
