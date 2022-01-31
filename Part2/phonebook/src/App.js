import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleChange = e => {
    setNewName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (persons.some(pers => pers.name === newName)) {
      alert(`${newName} is already added.`)
      setNewName('')
    }
    else {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(pers => {
            return <li key={pers.name}>{pers.name}</li>
          })
        }
      </ul>
    </div>
  )
}

export default App