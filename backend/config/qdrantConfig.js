import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";

const client = new QdrantClient({
  url: `https://2fb4c4f0-1b81-4550-9d7d-52f1e4e830d8.eu-west-2-0.aws.cloud.qdrant.io:6333`,
  apiKey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.kJbAGGxHE3H502j0YRrH9_5XbVj8HrUGUma_IdtKOt0`,
});

console.log("Qdrant DB client initialized");

export default client;
