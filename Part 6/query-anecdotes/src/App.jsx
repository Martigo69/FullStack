import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAll, updateNew} from './services/anecdotes'
import { useAnecdoteDispatch } from './components/AnecdoteContext'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useAnecdoteDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateNew, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: "SET", payload: `${data.content}'s votes is updated` })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000)
    },
  }) 

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
