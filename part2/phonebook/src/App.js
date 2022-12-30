import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const addPerson = (event) => {
    event.preventDefault()

    const targetPerson = persons.find(person => person.name.toLowerCase() == newName.toLowerCase())

    if (targetPerson) {      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = {name: newName, number: newNumber}

        personService
          .update(targetPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === targetPerson.id ? returnedPerson : person))
            setMessage(`Changed ${newName}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setMessageColor('red')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(persons.filter(person => person.name != newName))
            setNewName('')
            setNewNumber('')
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }

        personService
          .create(nameObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setMessage(`Added ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const deletePerson = (event) => {
    const id = parseInt(event.target.id)
    const targetPerson = persons.find(person => person.id === id)

    window.confirm(`Delete ${targetPerson.name}?`)
    ? personService
      .erase(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
    : setPersons(persons)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageColor={messageColor} />
      <Filter text={'filter shown with'} filterValue={filter} filterHandler={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameHandler={handleNewName} numberValue={newNumber} numberHandler={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App