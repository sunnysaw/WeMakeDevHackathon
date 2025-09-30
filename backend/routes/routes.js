import express from "express";
import { upload, uploadPdf } from "../controllers/multerUploadController.js";
import userCredentials from "../controllers/oAuthController.js";
import queryFormatting from "../controllers/formattingUserQuerController.js";

const router = express.Router();

router.post("/upload/fields", upload.single("pdf"), uploadPdf);
router.post('/oAuth', userCredentials)
router.get('/query' , queryFormatting)

export default router;
