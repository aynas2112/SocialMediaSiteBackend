import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphQLServer from "./graphql/index.js";

async function init() {
  const app = express();
  const port = 5000;

  app.use(cors({origin: true, credentials: true}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
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
