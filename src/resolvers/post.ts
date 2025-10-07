const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const user = await prisma.user.findUnique({
      where: { id: parent.authorId },
    });

    return user;
  },
};

export default Post;
