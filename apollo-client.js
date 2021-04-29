import { ApolloClient, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./cache";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("YuToken"));

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.access_token}` : "",
    },
  };
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    currentUserId: String
  }
`;

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
});

export default client;
