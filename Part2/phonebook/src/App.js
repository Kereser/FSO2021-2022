import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    message: null,
    class: null
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])


  const handleSubmit = e => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(pers => pers.name === newName)) {

      const result = window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with the new one?`)

      const [person] = persons.filter(pers => pers.name === newName)

      if (result) {
        personService
          .update(person.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(pers => {
              return pers.name === newName ? updatedPerson : pers
            }))
          })
          .catch(err => {
            setMessage({
              message: err.response.data.error,
              class: 'failed'
            })
            setTimeout(() => {
              setMessage({
                message: null,
                class: null
              })
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
    }

    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({
            message: `Added ${newName} to the phonebook`,
            class: 'success'
          })
          setTimeout(() => {
            setMessage({ message: null, class: null })
          }, 5000)
        })
        .catch(err => {
          setMessage({
            message: err.response.data.error,
            class: 'failed'
          })
          setTimeout(() => {
            setMessage({ message: null, class: null })
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = e => setNewName(e.target.value)

  const handleNumberChange = e => setNewNumber(e.target.value)

  const handleFilterChange = e => setFilter(e.target.value)

  const handleDelete = (id, name) => {
    const result = window.confirm(`Are you sure you want to delete ${name} from the phonebook?`)
    if (result) {
      personService
        .erase(id)
        .then(res => {
          setPersons(persons.filter(pers => pers.id !== id))
        })
    }
  }


  const personsToShow = persons.filter(pers => {
    return pers.name.toLowerCase().includes(filter.toLowerCase())
  }
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App