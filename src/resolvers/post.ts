import userLoader from "../dataLoaders/userLoader";

const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // const user = await prisma.user.findUnique({
    //   where: { id: parent.authorId },
    // });

    const user = userLoader.load(parent.authorId);

    return user;
  },
};

export default Post;
