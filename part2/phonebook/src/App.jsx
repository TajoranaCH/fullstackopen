import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
     }
  ])
  const [filterString, setFilterString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <PersonForm handleSubmit={addPerson} handleNameChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))}/>
    </div>
  )
}

export default App