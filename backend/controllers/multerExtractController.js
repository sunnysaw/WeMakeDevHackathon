import { createRequire } from "module";
import generatingEmbedding from "./cerebrasEmbeddingController.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const getPdf = async (file) => {
  try {
    const dataBuffer = Buffer.from(file.data);
    const data = await pdfParse(dataBuffer);
    const fileName = file.name;

    if (!data) {
      return {
        success: false,
        statusCode: 400,
        message: "Failed to extract text from PDF",
      };
    }

    const generatedEmbedding = await generatingEmbedding(data, fileName);

    if (generatedEmbedding?.success) {
      return {
        success: true,
        statusCode: 201,
        message: "Embedding generated successfully",
      };
    }

    return {
      success: false,
      statusCode: generatedEmbedding?.statusCode || 500,
      message: generatedEmbedding?.message || "Embedding generation failed",
    };
  } catch (error) {
    console.error("Error in getPdf =>", error.message);
    return {
      success: false,
      statusCode: 500,
      message: `Error in getPdf => ${error.message}`,
    };
  }
};

export default getPdf;
