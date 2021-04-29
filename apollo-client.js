import { ApolloClient, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./cache";

console.log(process.env.NEXT_PUBLIC_APOLLO_URI);
console.log(typeof process.env.NEXT_PUBLIC_APOLLO_URI);
console.log(process.env.NEXT_PUBLIC_CLIENT_ID);
console.log(typeof process.env.NEXT_PUBLIC_CLIENT_ID);

const uri = { uri: process.env.NEXT_PUBLIC_APOLLO_URI };

const httpLink = createHttpLink(uri);

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
