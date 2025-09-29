import mongoose from "mongoose";
import "dotenv/config";

const db_url = process.env.DB_URL;

const mongoConfig = async () => {
  try {
    await mongoose.connect(db_url);
      return {
          success : true ,
          statuscode: 200,
          message: `Db Connected Successfully`
      }
  } catch (error) {
    return {
      success: false,
      statuscode: 500,
      message: `error occur in mongoConfig file => ${error.message}`,
    };
  }
};

export default mongoConfig;
