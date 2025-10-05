import bcrypt from "bcrypt";
import jwtHelper from "../../utills/JWTHelper";

interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

const authResolvers = {
  signup: async (parent: any, args: IUserInfo, { prisma }: any) => {
    const hashedPassword = await bcrypt.hash(args.password, 12);

    const result = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: await hashedPassword,
      },
    });

    if (result.id && args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: result.id,
        },
      });
    }

    return result;
  },

  signin: async (
    parent: any,
    args: { email: string; password: string },
    { prisma }: any
  ) => {
    const user = await prisma.user.findUnique({
      where: { email: args.email },
    });

    const isMatch = await bcrypt.compare(args.password, user?.password!);

    if (!user || !isMatch) {
      return { userError: "Invalid credentials", token: null };
    }

    const token = jwtHelper.generateToken({ userId: user.id }, "9d");

    return { token, userError: null };
  },
};

export default authResolvers;
