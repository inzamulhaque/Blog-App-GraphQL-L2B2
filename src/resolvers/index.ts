import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const hashedPassword = await bcrypt.hash(args.password, 12);

      console.log(hashedPassword);

      const result = await prisma.user.create({
        data: {
          ...args,
          password: await hashedPassword,
        },
      });

      return result;
    },

    signin: async (
      parent: any,
      args: { email: string; password: string },
      context: any
    ) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      const isMatch = await bcrypt.compare(args.password, user?.password!);

      if (!user || !isMatch) {
        // throw new Error("Invalid credentials");

        return { userError: "Invalid credentials", token: null };
      }

      const token = jwt.sign({ userId: user.id }, "djcbchj22423", {
        expiresIn: "7d",
      });

      return { token, userError: null };
    },
  },
};

export default resolvers;
