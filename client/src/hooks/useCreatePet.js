import { PetsFragment } from '../fragments/pets.fragment'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ALL_PETS } from './useFindAllPets'

export const NEW_PET = gql`
  # ! means NewPetInput is mandatory
  mutation CreateAPet($newPet: NewPetInput!) {
    # addPet(input: $newPet) {
    #   # Returning the same fields as query so that apollo does not have to refetch but just use the data from mutation
    #   id
    #   name
    #   type
    #   img
    # }

    addPet(input: $newPet) {
      ...PetsFragment
    }
  }
  ${PetsFragment}
`

const useCreatePet = () => {
  return useMutation(NEW_PET, {
    update(cache, { data: { addPet } }) {
      const data = cache.readQuery({ query: ALL_PETS })
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...data.pets] },
      })
    },
    onError(error, variables, context) {
      // Remove the optimistic pet from the cache
      const data = client.readQuery({ query: ALL_PETS })
      const optimisticId = context && context.optimisticId
      if (optimisticId) {
        const filteredPets = data.pets.filter((pet) => pet.id !== optimisticId)
        client.writeQuery({
          query: ALL_PETS,
          data: { pets: filteredPets },
        })
      }
    },
    // Use optimisticResponse here if we don't need any variables
    // optimisticResponse: {},
  })
}

export { useCreatePet }
