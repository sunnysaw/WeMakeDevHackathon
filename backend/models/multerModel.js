import mongoose from "mongoose";

const multerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is missing"],
  },
  data: {
    type: Buffer,
    required: [true, "Data is missing"],
  },
  contentType: {
    type: String,
    required: [true, "Name is missing"],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const multerModel = new mongoose.model("multerModel", multerSchema);

export default multerModel;
