interface IAddPostArgs {
  post: {
    title: string;
    content: string;
  };
}

interface IUpdatePostArgs {
  id: number;
  post?: {
    title?: string;
    content?: string;
  };
  published?: boolean;
}

const postResolvers = {
  addPost: async (
    parent: any,
    args: IAddPostArgs,
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

    if (!args?.post?.title || !args?.post?.content) {
      return {
        userError: "Title and content are required",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: args?.post?.title,
        content: args?.post?.content,
        authorId: userInfo.userId,
      },
    });

    return { userError: null, post: result };
  },

  updatePost: async (
    parent: any,
    args: IUpdatePostArgs,
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        userError: "You must be logged in to update a post",
        post: null,
      };
    }

    const oldPost = await prisma.post.findUniqueOrThrow({
      where: {
        id: Number(args.id),
        authorId: userInfo.userId,
      },
    });

    const result = await prisma.post.update({
      where: { id: oldPost.id },
      data: {
        title: args.post?.title ?? oldPost.title,
        content: args.post?.content ?? oldPost.content,
        published: args.published ?? oldPost.published,
      },
    });

    return { userError: null, post: result };
  },
};

export default postResolvers;
