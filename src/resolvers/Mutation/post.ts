const postResolvers = {
  addPost: async (
    parent: any,
    args: { title: string; content: string },
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        userError: "You must be logged in to add a post",
        post: null,
      };
    }

    await prisma.user.findUniqueOrThrow({
      where: { id: userInfo.userId },
    });

    if (!args.title || !args.content) {
      return {
        userError: "Title and content are required",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.userId,
      },
    });

    return { userError: null, post: result };
  },
};

export default postResolvers;
