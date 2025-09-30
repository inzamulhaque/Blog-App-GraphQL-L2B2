import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers/index";

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 7000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main().catch((err) => {
  console.error("Error starting server:", err);
});
