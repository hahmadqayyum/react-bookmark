// fnAEDfNq8qACDSQ_C1vLrjPW60Z5JbcSihVTI9wG

const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    bookmark: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    description: String!
  }
  type Mutation {
    addBookmark(url: String!, description: String!): Bookmark
  }
`;

const authors = [
  {
    id: 1,
    url: "https://github.com/gatsbyjs/gatsby-starter-hello-world",
    description: "this is a github gatsby official repository",
  },
  {
    id: 2,
    url: "https://github.com/gatsbyjs/gatsby-starter-hello-world",
    description: "this is a github gatsby official repository",
  },
  {
    id: 3,
    url: "https://github.com/gatsbyjs/gatsby-starter-hello-world",
    description: "this is a github gatsby official repository",
  },
];

const resolvers = {
  Query: {
    bookmark: async (root, args, context) => {
      try {
        var client = new faunadb.Client({
          secret: "fnAEDfNq8qACDSQ_C1vLrjPW60Z5JbcSihVTI9wG",
        });
        var result = await client.query(
          q.Paginate(q.Match(q.Index("all-url"), "user1"))
        );
        return result.data.map(
          ([ref, url, description]) => ({
            id: ref.id,
            url,
            description,
          })
          //   q.Map(
          //     q.Paginate(q.Match(q.Index("all-url"), "user1")),
          //     q.Lambda((x) => q.Get(x))
          //   )
          // );
          // console.log(result);
          // return result.data.map((d) => {
          //   return {
          //     id: d.ts,
          //     url: d.data.url,
          //     description: d.data.description,
          //     owner: "user1"
          //   };
          // }
        );
      } catch (err) {
        console.log("err", err);
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { url, description }) => {
      // console.log("url--desc", url, description);
      try {
        var client = new faunadb.Client({
          secret: "fnAEDfNq8qACDSQ_C1vLrjPW60Z5JbcSihVTI9wG",
        });
        var result = await client.query(
          q.Create(q.Collection("links"), {
            data: {
              url,
              description,
              owner: "user1",
            },
          })
        );
        console.log(
          "Document Created and Inserted in Container: " + result.ref.id
        );
        return {
          ...results.data,
          id: results.ref.id,
        };
      } catch (error) {
        console.log("Error: ");
        console.log(error);
      }
      // console.log('url--description', url,'description',description);
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
