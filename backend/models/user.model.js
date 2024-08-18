import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^(\+\d{1,3}[- ]?)?\d{10}$/,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    aadharCard: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
      type: String,
    },
    doctorAvatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
