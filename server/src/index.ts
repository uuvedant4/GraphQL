import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { TODOS_DB } from "../db/TODOS_DB.js";
import { USERS_DB } from "../db/USERS_DB.js";

const PORT = 5000;

const typeDefs = `#graphql
type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
}

type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
}

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }
`;

const resolvers = {
  Query: {
    getTodos: () => TODOS_DB,
    getAllUsers: () => USERS_DB,
    getUser: (_, { id }, __, ___) =>
      USERS_DB.find((user: any) => user.id === id),
  },

  Todo: {
    user: (todo: any) => {
      return USERS_DB.find((user: any) => user.id === todo.id);
    },
  },
};

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  app.use(bodyParser.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}/graphql`)
  );
};

startServer();
