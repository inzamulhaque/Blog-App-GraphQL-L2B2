import authResolvers from "./auth";
import postResolvers from "./post";

const Mutation = {
  ...authResolvers,

  ...postResolvers,
};

export default Mutation;
