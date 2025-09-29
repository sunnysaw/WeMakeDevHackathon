import OpenAI from "openai";
import "dotenv/config";
import qdrantUploadEmbedding from "./qdrantUploadController.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const generatingEmbedding = async (data, fileName) => {
  try {
    const inputText = JSON.stringify(data); // always stringify non-string data

    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: inputText,
      encoding_format: "float",
    });

    const embeddings = response.data[0].embedding;

    try {
      if (fileName) {
        const qdrantUploadedData = await qdrantUploadEmbedding(
          embeddings,
          fileName
        );

        if (qdrantUploadedData?.success) {
          return {
            success: true,
            statusCode: 201,
            message: "Data is uploaded to Qdrant DB",
          };
        }
      }
    } catch (error) {
      console.error("Error in Qdrant upload:", error.message);
      return {
        success: false,
        statusCode: 500,
        message: `Error in qdrantUploadEmbedding => ${error.message}`,
      };
    }

    try {
      if (data && (fileName === undefined || fileName === null)) {
        return {
          success: true,
          statusCode: 200,
          message: embeddings,
        };
      }
    } catch (error) {
      return {
        success: false,
        statusCode: 500,
        message: `Error in generatingEmbedding file openAiEmbeddingController => ${error.message}`,
      };
    }
  } catch (error) {
    console.error(
      "Error generating embedding: file openAiEmbeddingController",
      error.message
    );
    return {
      success: false,
      statusCode: 500,
      message: `Error in generatingEmbedding file openAiEmbeddingController => ${error.message}`,
    };
  }
};

export default generatingEmbedding;
