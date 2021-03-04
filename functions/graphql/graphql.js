const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");

const q = faunadb.query;

var client = new faunadb.Client({
  secret: "fnAEDfA1F-ACDYKDFJbaMX1TW54-am78eBgZCWmX",
});

const typeDefs = gql`
type query {
    bookmarks: [BookMarks]!
}
type BookMarks: {
    id: ID!
    url: String!
    desc: String!
}
type Mutation : {
    addBookMarks(url: String!, desc: String!): BookMarks
}

`;

const resolvers = {
  Query: {
    bookmarks: async (parent, args) => {
      try {
        const results = await client.query(
          q.Map(
            q.Paginate(q.Index("url")),
            q.Lambda((x) => q.Get(x))
          )
        );
        return results.data.map((data) => {
          return {
            id: data.ts,
            url: data.data.url,
            desc: data.data.desc,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addBookMarks: async (_, { url, desc }) => {
      try {
        var results = await client.query(
          q.Create(q.Collection("bookmark"), {
            data: {
              url,
              desc,
            },
          })
        );
        console.log("id", results.ref.id);
        return results.ref.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
