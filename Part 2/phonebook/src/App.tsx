import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const personsData = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
const [searchPerson, setNewSearchPerson] = useState('')

const addNewPerson = (event) => {
    event.preventDefault()
    const newNameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    const searchPerson = persons.filter(person => person.name === newNameObject.name)
    if(searchPerson.length != 0){
      alert(`${newNameObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newNameObject))
      setNewName('')
      setNewNumber('')
    }
  } 

  const setNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const setNewPersonNumber = (event) => {
     setNewNumber(event.target.value)
  }

  const setNewSearch = (event) => {
    setNewSearchPerson(event.target.value)
    const filteredPersons = personsData.filter(personData => personData.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersons(filteredPersons)
    setNewName('')
    setNewNumber('')
 }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setNewSearch={setNewSearch}/>
      <h2>Add a New</h2>
      <PersonForm newName={newName} 
                  newNumber={newNumber}
                  setNewPerson={setNewPerson} 
                  setNewPersonNumber={setNewPersonNumber}
                  addNewPerson={addNewPerson}
                  />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App