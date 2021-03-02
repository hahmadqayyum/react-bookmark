const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");

const q = faunadb.query;
// fnAEDUmIzGACCX5xEhSC7Yc-i19DAkdh7MIePKYF
var client = new faunadb.Client({
  secret: "fnAEDUmIzGACCX5xEhSC7Yc-i19DAkdh7MIePKYF",
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
          q.Create(q.Collection("url"), {
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
