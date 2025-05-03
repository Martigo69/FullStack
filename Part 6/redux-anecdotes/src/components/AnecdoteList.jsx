import { useSelector, useDispatch } from 'react-redux'
import { alterAnecdotes } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdote.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
    const dispatch = useDispatch()
    
    const vote = (id) => {
      const votedAnecdote = anecdotes.find(item => item.id === id)
      const newAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      dispatch(alterAnecdotes(newAnecdote))
      dispatch(displayNotification(`You have voted for ${votedAnecdote.content}`, 10))
    }
    
    return (
        anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
    ))
}

export default AnecdoteList