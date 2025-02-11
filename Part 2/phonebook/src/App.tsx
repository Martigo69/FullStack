import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from "./services/Phoneservice"
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setNewSearchPerson] = useState('')
  const [errorMessage, setErrorMessage] = useState({data:null,color:'black'})

  useEffect(() => {
    phoneService.getPersons()
      .then(persons => {
        setPersons(persons)
      })
      .catch(() => {
        const errorMessageObject = {
          data: `Unable to get the Phone book List`,
          color: 'red'
        }
        setErrorMessage(errorMessageObject)
        setTimeout(() => {
          setErrorMessage({data:null,color:'black'})
        },5000)
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
        const errorMessageObject = {
          data: `${newNameObject.name}'s number is updated in the Phone book List`,
          color: 'green'
        }
        setErrorMessage(errorMessageObject)
        setTimeout(() => {
          setErrorMessage({data:null,color:'black'})
        },5000)
        })
        .catch(() => {
          const errorMessageObject = {
            data: `Unable to update ${newNameObject.name}'s data`,
            color: 'red'
          }
          setErrorMessage(errorMessageObject)
          setTimeout(() => {
            setErrorMessage({data:null,color:'black'})
          },5000)
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
        const errorMessageObject = {
          data: `${newNameObject.name} is added the Phone book List`,
          color: 'green'
        }
        setErrorMessage(errorMessageObject)
        setTimeout(() => {
          setErrorMessage({data:null,color:'black'})
        },5000)
      })
      .catch(() => {
        const errorMessageObject = {
          data: `Unable to add ${newNameObject.name} the Phone book List`,
          color: 'red'
        }
        setErrorMessage(errorMessageObject)
        setTimeout(() => {
          setErrorMessage({data:null,color:'black'})
        },5000)
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
      <Notification errorMessage={errorMessage} />
      <Filter searchPerson={searchPerson}
              setNewSearch={setNewSearch}
              />
      <h2>Add a New</h2>
      <PersonForm newName={newName} 
                  newNumber={newNumber}
                  setNewPerson={setNewPerson} 
                  setNewPersonNumber={setNewPersonNumber}
                  addNewPerson={addNewPerson}
                  />
      <h2>Numbers</h2>
      <Persons persons={persons}
               searchPerson={searchPerson} 
               setPersons={setPersons}
               setErrorMessage={setErrorMessage}
               />
    </div>
  )
}

export default App