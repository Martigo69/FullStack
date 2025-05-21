import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = e => setValue(e.target.value)
  const onReset = () => setValue('')
  return { type, value, onChange, onReset }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const get = useCallback(async () => {
    const { data } = await axios.get(baseUrl)
    setResources(data)
  }, [baseUrl])

  const create = useCallback(async (resource) => {
    const { data } = await axios.post(baseUrl, resource)
    setResources(prev => prev.concat(data))
  }, [baseUrl])

  useEffect(() => {
    get()
  }, [get])

  return [resources, { get, create }]
}

const App = () => {
  const content = useField('text')
  const name    = useField('text')
  const number  = useField('text')

  const [notes,    noteService]   = useResource('http://localhost:3005/notes')
  const [persons,  personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = e => {
    e.preventDefault()
    noteService.create({ content: content.value })
    content.onReset()
  }

  const handlePersonSubmit = e => {
    e.preventDefault()
    personService.create({
      name:   name.value,
      number: number.value
    })
    name.onReset()
    number.onReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(p => 
        <p key={p.id}>{p.name} {p.number}</p>
      )}
    </div>
  )
}

export default App