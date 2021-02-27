const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb = require("faunadb");

const q = faunadb.query;

var client = faunadb.Client({
  secret: process.env.FAUNA,
});

const typeDefs = gql`
  type Query {
    bookmarks: [BookMarks]!
  }
  type BookMarks {
    id: ID!
    url: String!
    description: String!
  }
  type Mutation {
    addBookmark(url: String!): BookMark
  }
`;
const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("url"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        return result.data.map((data) => {
          return {
            id: data.ts,
            url: data.url,
            description: data.description,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { url }) => {
      try {
        const results = await client.query(
          q.Create(q.Collection("bookmark"), {
            data: {
              url,
            },
          })
        );
        return {
          ...results.data,
          id: results.ref.id,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
