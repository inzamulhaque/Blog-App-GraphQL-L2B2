const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyProfile = userInfo && userInfo.userId === parent.id;

    if (isMyProfile) {
      return await prisma.post.findMany({
        where: { authorId: parent.id },
      });
    } else {
      return await prisma.post.findMany({
        where: { authorId: parent.id, published: true },
      });
    }
  },
};

export default User;
