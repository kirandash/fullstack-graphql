import { PetsFragment } from '../fragments/pets.fragment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// Redux style action naming
export const ALL_PETS = gql`
  query AllPets {
    pets {
      ...PetsFragment
    }
  }
  ${PetsFragment}
`

const useFindAllPets = () => {
  return useQuery(ALL_PETS)
}

export { useFindAllPets }
