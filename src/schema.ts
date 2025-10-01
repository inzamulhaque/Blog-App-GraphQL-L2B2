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
    ): User
  }
`;

export default typeDefs;
