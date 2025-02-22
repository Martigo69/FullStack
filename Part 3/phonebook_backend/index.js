require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


morgan.token('body', (req) => JSON.stringify(req.body) || '{}')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(persons => {
    const resp = `<p>${new Date().toLocaleString()}</p><br/><p>Phonebook has information for ${persons.length} People</p>`
    response.send(resp)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    }).catch(error => { next(error) })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        Person.findByIdAndDelete(id).then(() => {
          response.json(person)
        })
      } else {
        return response.status(400).json({
          error: 'Person not in the phonebook'
        })
      }
    }).catch(error => { next(error) })
})

app.put('/api/persons/:id', (request, response, next) => {
  const updatePersonId = request.params.id
  if (request.body.name && request.body.number) {
    const updatePerson = {
      'name': request.body.name,
      'number': request.body.number
    }
    Person.findByIdAndUpdate(updatePersonId, updatePerson, { new: true }).then( persons => {
      console.log(persons)
      if (persons) {
        response.json(persons)
      } else {
        return response.status(400).json({
          error: 'Person not in the phonebook'
        })
      }
    }).catch(error => { next(error) })
  } else {
    return response.status(400).json({
      error: 'Person details missing'
    })
  }
})

app.post('/api/persons', (request, response, next) => {
  const addPerson = request.body
  if (addPerson.name && addPerson.number) {
    const newPerson = new Person({
      'name': addPerson.name,
      'number': addPerson.number
    })
    Person.find({ 'name': addPerson.name }).then( person => {
      if (person.length) {
        return response.status(400).json({
          error: 'Person already in phonebook'
        })
      } else {
        newPerson.save().then(savedPerson => {
          response.json(savedPerson)
        }).catch(error => { next(error) })
      }
    })
  } else {
    return response.status(400).json({
      error: 'Person details missing'
    })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})