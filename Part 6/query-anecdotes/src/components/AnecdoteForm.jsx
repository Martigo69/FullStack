import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../services/anecdotes'
import { useAnecdoteDispatch } from './AnecdoteContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useAnecdoteDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNew,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: "SET", payload: `${data.content} is created` })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'SET', payload: `too short anecdote, must have length 5 or more !` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
