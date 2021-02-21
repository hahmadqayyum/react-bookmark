const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb = require("faunadb");

const q = faunadb.query;

const client = faunadb.Client({ secret: process.env.FAUNA });

const typeDefs = gql`
  type Query {
    bookMarks: [BookMarks]!
  }
  type BookMarks {
    id: ID!
    url: String!
    description: String!
  }
`;
const resolvers = {
  Query: {
    bookMarks: () => {
        const results = client.query({
            
        })
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
