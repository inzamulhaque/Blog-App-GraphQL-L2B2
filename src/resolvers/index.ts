import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      const users = await prisma.user.findMany();

      return users;
    },
  },

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
