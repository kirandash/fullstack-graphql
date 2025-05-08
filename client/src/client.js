import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

/**
 * Create a new apollo client and export as default
 */
const link = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});
// cache is a new instance of InMemoryCache. This will be used to store the data that we fetch from the server.
// Extensible InMemoryCache
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const query = gql`
  {
    characters {
      results {
        name
        id
      }
    }

    characters {
      results {
        name
        id
      }
    }
  }
`;

client.query({ query }).then((result) => console.log(result));

export default client;
