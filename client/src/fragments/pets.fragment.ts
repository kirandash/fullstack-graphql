import gql from 'graphql-tag'

export const PetsFragment = gql`
  # fragment keyword some name on Type
  fragment PetsFragment on Pet {
    # Always use an id for apollo to cache easily otherwise apollo will use the path to the node as the cache index and it might get less performant for apollo to update these when there is a mutation etc
    id
    name
    type
    img
    vaccinated @client
    owner {
      id
      # @client directive says apollo that this need to be fetched from client schema only
      age @client
    }
  }
`
