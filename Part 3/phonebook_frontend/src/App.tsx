import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from "./services/Phoneservice"
import Notification from './components/Notification'
import { Person, NewPerson, ErrorMessage } from './components/types'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setNewSearchPerson] = useState('')
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ data: null, color: 'black' })

  useEffect(() => {
    phoneService.getPersons()
      .then(persons => {
        setPersons(persons)
      })
      .catch(() => {
        const errorMessageObject: ErrorMessage = {
          data: `Unable to get the Phone book List`,
          color: 'red'
        }
        setErrorMessage(errorMessageObject)
        setTimeout(() => {
          setErrorMessage({ data: null, color: 'black' })
        }, 5000)
      })
  }, [])

  const addNewPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNameObject: NewPerson = {
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.find(person => person.name === newNameObject.name)
    if (foundPerson) {
      const resp = window.confirm(`${newNameObject.name} is already added to phonebook, replace the old number with the new one?`)
      if (resp) {
        phoneService.updatePerson(foundPerson.id.toString(), newNameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => foundPerson.id === person.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            const errorMessageObject: ErrorMessage = {
              data: `${newNameObject.name}'s number is updated in the Phone book List`,
              color: 'green'
            }
            setErrorMessage(errorMessageObject)
            setTimeout(() => {
              setErrorMessage({ data: null, color: 'black' })
            }, 5000)
          })
          .catch(() => {
            const errorMessageObject: ErrorMessage = {
              data: `Unable to update ${newNameObject.name}'s data`,
              color: 'red'
            }
            setErrorMessage(errorMessageObject)
            setTimeout(() => {
              setErrorMessage({ data: null, color: 'black' })
            }, 5000)
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
          const errorMessageObject: ErrorMessage = {
            data: `${newNameObject.name} is added to the Phone book List`,
            color: 'green'
          }
          setErrorMessage(errorMessageObject)
          setTimeout(() => {
            setErrorMessage({ data: null, color: 'black' })
          }, 5000)
        })
        .catch(() => {
          const errorMessageObject: ErrorMessage = {
            data: `Unable to add ${newNameObject.name} to the Phone book List`,
            color: 'red'
          }
          setErrorMessage(errorMessageObject)
          setTimeout(() => {
            setErrorMessage({ data: null, color: 'black' })
          }, 5000)
        })
    }
  }

  const setNewPersonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  const setNewPersonNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value)
  }

  const setNewSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSearchPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} />
      <Filter searchPerson={searchPerson} setNewSearch={setNewSearch} />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewPerson={setNewPersonHandler}
        setNewPersonNumber={setNewPersonNumberHandler}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchPerson={searchPerson}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  )
}

export default App
