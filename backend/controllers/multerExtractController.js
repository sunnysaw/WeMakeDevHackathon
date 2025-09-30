import generatingEmbedding from "./openAiEmbeddingController.js";
import searchEmbedding from "./qdrantRetriveController.js";
import generateFinalOutput from "./cerebrasCompletionController.js";

const queryFormatting = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Query is required",
      });
    }

    // Step 1: Generate embedding
    const generatedEmbedding = await generatingEmbedding(query);
    if (!generatedEmbedding?.success) {
      // Step 2: Search embedding in Qdrant
      const matchEmbedding = await searchEmbedding(generatedEmbedding.message);
      if (!matchEmbedding?.success) {
        // Step 3: Generate final output from Cerebras
        const finalOutput = await generateFinalOutput(
          query,
          matchEmbedding.message
        );
        if (!finalOutput?.success) {
          return res.status(500).json({
            success: false,
            statusCode: 500,
            message: finalOutput?.message || "Failed to generate final output",
          });
        }
      }
    }
    // ✅ Success Response
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: finalOutput.message,
    });
  } catch (error) {
    console.error("Error in queryFormatting:", error.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default queryFormatting;
