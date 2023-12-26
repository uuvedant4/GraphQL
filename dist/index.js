import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// Dummy books data
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
// Defining schemas
const typeDefs = `#graphql
type Book {
    title:String
    author:String
}
type Query {
    books:[Book]
}
`;
// Defining resolvers
const resolvers = {
    Query: {
        books: () => books,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
});
console.log(`Server running at ${url}`);
