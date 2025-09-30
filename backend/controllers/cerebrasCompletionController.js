import Cerebras from "@cerebras/cerebras_cloud_sdk";
import "dotenv/config";

const client = new Cerebras({ apiKey: process.env.CEREBRAS_API_KEY });

const generateFinalOutput = async (query) =>
{
  try {
    const completionCreateResponse = await client.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "llama-4-scout-17b-16e-instruct",
    });
    console.log(
      `ai 01 => ${
        completionCreateResponse?.choices?.[0]?.message?.content ||
        "No response"
      }`
    );
    const response =
      completionCreateResponse?.choices?.[0]?.message?.content || "No response";
    return {
      success: true,
      statuscode: 200,
      message: response,
    };
  } catch (error) {
    return {
      success: false,
      statuscode: 500,
      message: `error occur in cerebrasCompletionController file => ${error.message}`,
    };
  }
};

export default generateFinalOutput;
