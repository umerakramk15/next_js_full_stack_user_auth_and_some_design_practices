import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: string,
      required: [true, "Please Provide a username"],
      unique: true,
    },
    email: {
      type: string,
      required: [true, "Please Provide a email"],
      unique: true,
    },
    password: {
      type: string,
      required: [true, "Please Provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    VerfiyToken: String,
    VerfiyTokenExpiry: Date,
  },
  { timestamps: true }
);
