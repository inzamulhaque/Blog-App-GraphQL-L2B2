import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

const resolvers = {
  Query: {},

  Mutation: {
    signup: async (parent: any, args: IUserInfo, context: any) => {
      const result = await prisma.user.create({
        data: {
          ...args,
        },
      });

      return result;
    },
  },
};

export default resolvers;
