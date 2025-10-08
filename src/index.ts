import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers/index";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import jwtHelper from "./utills/JWTHelper";
import { JwtPayload } from "jsonwebtoken";

export const prisma = new PrismaClient();

interface IContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: JwtPayload | null;
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 7000 },
    context: async ({ req }): Promise<IContext> => {
      const token = req.headers.authorization || "";
      const decoded = jwtHelper.decodeToken(token);

      return {
        prisma,
        userInfo: decoded ? (decoded as JwtPayload) : null,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main().catch((err) => {
  console.error("Error starting server:", err);
});
