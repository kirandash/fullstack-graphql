import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'
import { ApolloLink } from 'apollo-link'
/**
 * Create a new apollo client and export as default
 */
const http = new HttpLink({
  // uri: "https://rickandmortyapi.com/graphql",
  uri: 'http://localhost:4000',
})

// Delay link - takes a cb fn that returns a request. We will simulate the request with a delay
const delay = setContext(
  (request) =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success()
      }, 800)
    })
)

// Links will execute in order
const link = ApolloLink.from([delay, http])

// cache is a new instance of InMemoryCache. This will be used to store the data that we fetch from the server.
// Extensible InMemoryCache
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

// const query = gql`
//   {
//     characters {
//       results {
//         name
//         id
//       }
//     }

//     characters {
//       results {
//         name
//         id
//       }
//     }
//   }
// `;

// client.query({ query }).then((result) => console.log(result));

export default client
