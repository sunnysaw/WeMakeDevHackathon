import client from "../config/qdrantConfig.js";

const searchEmbedding = async (queryEmbedding, collectionName) => {
  try {
    const result = await client.search(collectionName, {
      vector: queryEmbedding,
      with_payload: true,
      with_vector: true,
    });
    return {
      success: true,
      statuscode: 200,
      message: result,
    };
  } catch (error) {
    return {
      success: false,
      statuscode: 500,
      message: `error occur in qdrantEmbeddingRetriveController file => ${error.message}`,
    };
  }
};

export default searchEmbedding;
