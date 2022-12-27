import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('request fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={'filter shown with'} filterValue={filter} filterHandler={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameHandler={handleNewName} numberValue={newNumber} numberHandler={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App