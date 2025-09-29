import multer from "multer";
import multerModel from "../models/multerModel.js";
import getPdf from "./multerExtractController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Check if file already exists in DB
    const fileExist = await multerModel.findOne({
      name: req.file.originalname,
    });
    if (fileExist) {
      return res.status(400).json({
        success: false,
        message: "File already exists, please choose another file",
      });
    }

    // Create new file document
    const fileDoc = new multerModel({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    // Save to DB
    const saved = await fileDoc.save();

    if (!saved?._id) {
      return res.status(500).json({
        success: false,
        message: "Failed to save file to database",
      });
    }

    // Process PDF after saving
    const processedPdf = await getPdf(saved);

    // If processing fails, delete the uploaded file from DB
    if (!processedPdf?.success) {
      await multerModel.deleteOne({ _id: saved._id });
      return res.status(processedPdf?.statusCode || 500).json({
        success: false,
        message:
          processedPdf?.message ||
          "Failed to process PDF, file deleted from DB",
      });
    }

    // Final response
    return res.status(201).json({
      success: true,
      message: "File uploaded and processed successfully",
      id: saved._id,
    });
  } catch (error) {
    console.error("Error in uploadPdf =>", error.message);
    return res.status(500).json({
      success: false,
      message: `Error in uploadPdf => ${error.message}`,
    });
  }
};

export { upload, uploadPdf };
