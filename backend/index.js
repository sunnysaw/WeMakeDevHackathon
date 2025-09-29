import express from "express";
import helemt from "helmet";
import cors from "cors";
import mongoConfig from "./config/mongoConfig.js";
import router from "./routes/routes.js";

const port = process.env.PORT || 5000;

const app = express();

const mongoDbConnection = await mongoConfig();
if (mongoDbConnection?.success) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helemt());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(router);

  app.get("/", (req, res) => {
    res.send("server is running ");
  });

  app.listen(port, () => {
    console.log(`server is running on port => ${port}`);
  });
} else {
  console.log(mongoDbConnection.message);
  process.exit(1);
}
