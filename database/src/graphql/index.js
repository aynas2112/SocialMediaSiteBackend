import { ApolloServer } from "@apollo/server";
import { User } from "./user/user.js";
import { Chat } from "./chats/chats.js";

async function createApolloGraphQLServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
          type Query {
            ${User.queries}
          }
          type Mutation {
            ${User.mutations}
          }
        ${Chat.typeDefs}
          type Query {
            ${Chat.queries}
          }
          type Mutation {
            ${Chat.mutations}
          }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Chat.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Chat.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQLServer;
