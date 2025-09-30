import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "missing name"],
  },
  email: {
    type: String,
    required: [true, "missing email"],
  },
  email_verified: {
    type: String,
    required: [true, "missing email_verified"],
  },
});

const userModel = new mongoose.model("userModel", userSchema);

export default userModel;
