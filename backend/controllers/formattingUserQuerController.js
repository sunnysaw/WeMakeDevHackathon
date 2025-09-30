import generatingEmbedding from "./openAiEmbeddingController.js";
import searchEmbedding from "./qdrantRetriveController.js";
import generateFinalOutput from "./cerebrasCompletionController.js";

const queryFormatting = async (req, res) => {
    try {
        const { query } = req.body
        try {
            const generateEmbedding = await generatingEmbedding(query)
            if (generateEmbedding?.success) {
                try {
                    const matchEmbedding = await searchEmbedding()
                    if (matchEmbedding?.success) {
                        const result = await generateFinalOutput()
                    }
                } catch (error) {
                    
                }
            }
        } catch (error) {
           return {
             success: false,
             statuscode: 500,
             message: generateEmbedding.message,
           }; 
        }
  } catch (error) {
    return {
      success: false,
      statuscode: 500,
      message: `error occur in the formattingUserQueryController => ${error.message}`,
    };
  }
};

export default queryFormatting;
