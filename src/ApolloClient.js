import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://ahmad-bookmark-react-app.netlify.app/.netlify/functions/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});
