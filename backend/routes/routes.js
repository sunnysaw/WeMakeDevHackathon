import express from "express";
import { upload, uploadPdf } from "../controllers/multerUploadController.js";
const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadPdf);

export default router;
