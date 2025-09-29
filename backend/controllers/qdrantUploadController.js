import client from "../config/qdrantConfig.js";

const qdrantUploadEmbedding = async (embedding, fileName) => {
  try {
    const collectionName = fileName;

    // Try to create collection
    try {
      await client.createCollection(collectionName, {
        vectors: { size: embedding.length, distance: "Cosine" },
      });
    } catch (err) {
      if (err.message.includes("already exists")) {
        throw err;
      }
    }

    // Upsert embedding
    await client.upsert(collectionName, {
      points: [
        {
          id: Date.now(),
          vector: embedding,
          payload: {
            source: "openai",
            note: "test embedding",
            file: fileName,
          },
        },
      ],
    });

    console.log("✅ Embedding uploaded to Qdrant");
    return { success: true, message: "Embedding uploaded to Qdrant" };
  } catch (error) {
    console.error("❌ Error uploading embedding to Qdrant:", error.message);
    return { success: false, message: error.message };
  }
};

export default qdrantUploadEmbedding;
