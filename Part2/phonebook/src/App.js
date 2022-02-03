import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPhonebook => {
        console.log(initialPhonebook)
        setPersons(initialPhonebook)
      })
  }, [])


  const handleSubmit = e => {
    e.preventDefault()

    if (persons.some(pers => pers.name === newName)) {
      alert(`${newName} is already added.`)
      setNewName('')
      setNewNumber('')
    }

    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = e => setNewName(e.target.value)

  const handleNumberChange = e => setNewNumber(e.target.value)

  const handleFilterChange = e => setFilter(e.target.value)
  



  const personsToShow = persons.filter(pers => {
    return pers.name.toLowerCase().includes(filter.toLowerCase())
  }
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} func={handleFilterChange} />
      <h2>Add a new one</h2>
      <PersonForm
        funcSubmit={handleSubmit}
        funcChangeName={handleNameChange}
        funcChangeNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App