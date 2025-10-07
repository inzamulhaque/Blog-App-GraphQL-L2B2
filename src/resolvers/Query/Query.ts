const Query = {
  me: async (__: any, _: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      console.log("user not logged in");

      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: userInfo.userId },
    });

    return user;
  },

  profile: async (parent: any, args: { userId: string }, { prisma }: any) => {
    const profile = await prisma.profile.findUnique({
      where: { userId: Number(args.userId) },
    });

    return profile;
  },

  users: async (parent: any, args: any, { prisma }: any) => {
    const users = await prisma.user.findMany();

    return users;
  },

  posts: async (__: any, _: any, { prisma }: any) => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return posts;
  },
};

export default Query;
