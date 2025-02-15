import phoneService from "../services/Phoneservice"
import { PersonsProps } from "./types";

const Persons: React.FC<PersonsProps> = ({persons, searchPerson, setPersons, setErrorMessage}) => {
    let filteredPersons = []

    interface PersonIdentifier {
        id: number;
        name: string;
      }

    const deletePersonFromPhonebook = ({id,name}: PersonIdentifier) => {
        const resp = window.confirm(`Delete ${name} ?`)
        if (resp) {
            phoneService
            .deletePerson(id.toString())
            .then(returnedDeletedPerson => {
                persons = persons.filter(person => person.id !== returnedDeletedPerson.id)
                setPersons(persons)
                const errorMessageObject = {
                    data: `${name} is deleted from the Phone book List`,
                    color: 'green'
                  }
                setErrorMessage(errorMessageObject)
                setTimeout(() => {
                setErrorMessage({data:null,color:'black'})
                },5000)
            })
            .catch(() => {
                const errorMessageObject = {
                    data: `Unable to delete ${name} the Phone book List`,
                    color: 'green'
                  }
                setErrorMessage(errorMessageObject)
                setTimeout(() => {
                setErrorMessage({data:null,color:'black'})
                },5000)
            })       
        } 
    }
    if (searchPerson.length !== 0) {
       filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchPerson.toLowerCase()))
        return (
            filteredPersons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePersonFromPhonebook({ id: person.id, name: person.name })}>Delete Person</button></p>) 
        )
    } else {
        return (
            persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePersonFromPhonebook({ id: person.id, name: person.name })}>Delete Person</button></p>) 
        )
    }
}


export default Persons