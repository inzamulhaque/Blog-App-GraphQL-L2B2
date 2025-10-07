const typeDefs = `#graphql
  
  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User
    createdAt: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
  }

  type Profile {
        id: ID!
        bio: String!
        createdAt: String!
        user: User!
    }

    type AuthPayload {
        token: String
        userError: String
    }

    type PostPayload {
        post: Post
        userError: String
    }

    type DeletePostPayload {
        message: String
        userError: String
    }

    input PostInput {
        title: String
        content: String
    }

  type Query {
    me: User
    users: [User]
    posts: [Post]
  }

  type Mutation {
    signup(
      name: String!,
      email: String!,
      password: String!
      bio: String
    ): User

    signin(
      email: String!,
      password: String!
    ): AuthPayload

    addPost(
      post: PostInput!
    ): PostPayload

    updatePost(
      id: ID!
      post: PostInput
      published: Boolean
    ): PostPayload

    deletePost(
      id: ID!
    ): DeletePostPayload

    publishPost(
      id: ID!
    ): PostPayload
  }
`;

export default typeDefs;
