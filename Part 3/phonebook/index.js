const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body) || '{}');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    const resp = `<p>${new Date().toLocaleString()}</p><br/><p>Phonebook has information for ${persons.length} People</p>`
    response.send(resp)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const filteredPerson = persons.find(person => person.id === id)
    if(filteredPerson) {
        response.json(filteredPerson)
    } else {
        return response.status(400).json({ 
            error: 'Person not in the phonebook'  
          })
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const deletePerson = persons.find(note => note.id === id)
    if (deletePerson) {
        response.status(204).end()
    } else {
        return response.status(400).json({ 
            error: 'Person not in the phonebook' 
          })
    }
  })

  const generateId = () => {
    let newId;
    do {
        newId = Math.floor(Math.random() * 10000) + 1; 
    } while (persons.some(person => person.id === String(newId))); 
    
    return String(newId); 
};


  app.post('/api/persons', (request, response) => {
    const addPerson = request.body
    if (addPerson.name && addPerson.number) {
        const newPerson = { 
            "id":generateId(),
            "name": addPerson.name, 
            "number": addPerson.number
          }
        if (persons.some(person => person.name === newPerson.name)){
            return response.status(400).json({ 
                error: 'name must be unique' 
              })
        }
        persons = persons.concat(newPerson)
        response.send(newPerson)
    } else {
        return response.status(400).json({ 
            error: 'Person details missing' 
          })
    }
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })