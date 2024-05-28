import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(p => {
        setPersons(p)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (newName === '') return

    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    if (!newNumber) {
      alert('Number is missing!')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterStringChange = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filterString} handleChange={handleFilterStringChange} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))} />
    </div>
  )
}

export default App