import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from "./services/Phoneservice"

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setNewSearchPerson] = useState('')

  useEffect(() => {
    phoneService.getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])


  const addNewPerson = (event) => {
    event.preventDefault()
    const newNameObject = {
      name: newName,
      number: newNumber
    }
    const searchPerson = persons.filter(person => person.name === newNameObject.name)[0]
    if(searchPerson != null){
      const resp = window.confirm(`${newNameObject.name} is already added to phonebook, replace the old number with the new one?`)
      if (resp) {
      phoneService.updatePerson(searchPerson.id,newNameObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => searchPerson.id == person.id ? returnedPerson : person ))
        setNewName('')
        setNewNumber('')
        })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      phoneService.createPerson(newNameObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
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
      <Persons persons={persons} searchPerson={searchPerson} setPersons={setPersons}/>
    </div>
  )
}

export default App