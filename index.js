const ClientAPI = require('./clients.js');
const PolicyAPI = require('./policies.js');

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  
  type Query {
    getClients: [Client]
    getPolicies: [Policy]
    }

  type Client {
    id: String
    name: String
    email: String
    role: String
    }

  type Policy {
    id: String
    email: String
    clientId: String
    }
  
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        getClients: (_, __, { dataSources }) =>
            dataSources.ClientAPI.getAllClients(),

        getPolicies: (_, __, { dataSources }) =>
            dataSources.PolicyAPI.getAllPolicies(),

    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        ClientAPI: new ClientAPI(),
        PolicyAPI: new PolicyAPI()
    })
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);