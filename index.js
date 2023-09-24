const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }
  type Car {
    id: ID!
    name: String!
    make: String!
  }
  type ManualGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    memberships: [GroupMembership!]!
  }
  type AutomaticGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    memberships: [GroupMembership!]!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeperately: Boolean!
  }
  type AutomaticGroupFeatures {
    column: String!
  }
  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {},
  },
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));

// 31
