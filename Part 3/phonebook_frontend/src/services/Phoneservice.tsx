import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

interface NewPerson {
  name: string;
  number: string;
}

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = (newObject: NewPerson) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const updatePerson = (id: string, newObject: NewPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id: string) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getPersons, createPerson, updatePerson, deletePerson }