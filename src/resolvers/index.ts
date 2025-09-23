import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {},

  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      console.log("Args: ", args);
    },
  },
};

export default resolvers;
