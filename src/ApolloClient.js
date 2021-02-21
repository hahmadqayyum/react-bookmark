import {
  ApolloProvider,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "",
  }),
});
