import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphQLServer from "./graphql/index.js";

async function init() {
  const app = express();
  const port = 5000;

  app.use(cors());
  app.use(express.json());

  const gqlServer = await createApolloGraphQLServer();


  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use(
    '/graphql',
    expressMiddleware(gqlServer),
  );

  app.listen(port, () => {
    console.log(`Graphql app listening on port ${port}`);
  });
}

init();
