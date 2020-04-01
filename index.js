const clients = require('./clients.js');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  
  type Query {
    hello: String
    getBooks: [Book]
    getClients: [Client]
    }

  type Book {
    title: String
    author: String
    }

  type Client {
    id: String
    name: String
    email: String
    role: String
    }
  
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => "Hola Mundo",
        getBooks: () => books,
        getClients: () => clients.getClients( (v) => {return v} ),
    },
};



const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);