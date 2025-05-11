import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'
import { useFindAllPets } from '../hooks/useFindAllPets'
import { useCreatePet } from '../hooks/useCreatePet'

export default function Pets() {
  const [modal, setModal] = useState(false)
  // Runs the query right away
  const { data, loading, error } = useFindAllPets()
  // Gives us the createPet fn that we can use to run the mutation
  // newPet: { data, loading, error } we are using namespace to avoid variable name conflicts
  const [createPet, newPet] = useCreatePet()

  const onSubmit = (input) => {
    setModal(false)
    // this we are not showing on UI so we wil l add a random one. It will be replaced by real ID once we have data from BE
    const optimisticId = Math.floor(Math.random() * 10000) + ''
    createPet({
      variables: {
        newPet: input,
      },
      // Use optimisticResponse here if we need any variables
      optimisticResponse: {
        // this is not shown on the schema but we should add
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet',
          id: optimisticId,
          name: input.name,
          type: input.type,
          img: 'https://placehold.co/600x400',
          vaccinated: false, // @client field
          owner: {
            __typename: 'Owner',
            id: 'temp-owner-id',
            age: 0, // @client field
          },
        },
      },
      context: { optimisticId },
    })
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  // if (loading || newPet.loading) {
  // remove newPet.loading for optimisticResponse since it will still be loading for the network call
  if (loading) {
    return <Loader />
  }

  // if (error || newPet.error) {
  if (error) {
    return <p>error!</p>
  }

  console.log(data)

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
