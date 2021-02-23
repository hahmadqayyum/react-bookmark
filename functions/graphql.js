const { ApolloServer, gql } = require("apollo-server-lambda");

const faunadb = require("faunadb");

const q = faunadb.query;

const client = faunadb.Client({
  secret: "fnAECxLziTACB807FExI1RGjXPw1oretHsy5PtxX",
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
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
