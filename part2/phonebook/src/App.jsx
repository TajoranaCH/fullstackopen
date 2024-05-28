import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [noticationMessage, setNotificationMessage] = useState(null)
  let notificationType = 'message'
  useEffect(() => {
    personService.getAll()
      .then(p => {
        setPersons(p)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (newName === '') return

    if (!newNumber) {
      alert('Number is missing!')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find(p => p.name === newName)
    if (foundPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the phone number?`)) {
        personService
          .update(foundPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === foundPerson.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Updated ${updatedPerson.name} with success.`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
        }
      return
    }


    personService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Created ${createdPerson.name} with success.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
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

  const deletePerson = (personId) => {
    const personName = persons.find(p => p.id === personId).name
    if (window.confirm(`Delete ${personName}?`)) {
    personService
      .deletePerson(personId)
      .then(r => {
        if (r!==true) {
          alert('Unable to delete!')
          return
        }
        setPersons(persons.filter(p => p.id !== personId))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noticationMessage} type={notificationType} />
      <Filter filterString={filterString} handleChange={handleFilterStringChange} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))} handleDelete={deletePerson}/>
    </div>
  )
}

export default App