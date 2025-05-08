import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

// Redux style action naming
const ALL_PETS = gql`
  query AllPets {
    pets {
      # Always use an id for apollo to cache easily otherwise apollo will use the path to the node as the cache index and it might get less performant for apollo to update these when there is a mutation etc
      id
      name
      type
      img
    }
  }
`

const NEW_PET = gql`
  # ! means NewPetInput is mandatory
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      # Returning the same fields as query so that apollo does not have to refetch but just use the data from mutation
      id
      name
      type
      img
    }
  }
`

export default function Pets() {
  const [modal, setModal] = useState(false)
  // Runs the query right away
  const { data, loading, error } = useQuery(ALL_PETS)
  // Gives us the createPet fn that we can use to run the mutation
  // newPet: { data, loading, error } we are using namespace to avoid variable name conflicts
  const [createPet, newPet] = useMutation(NEW_PET)

  const onSubmit = (input) => {
    setModal(false)
    createPet({
      variables: {
        newPet: input,
      },
    })
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if (loading || newPet.loading) {
    return <Loader />
  }

  if (error || newPet.error) {
    return <p>error!</p>
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
