import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { notifyAnecdote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdote.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
    const dispatch = useDispatch()
    
    const vote = (id) => {
      const votedAnecdote = anecdotes.find(item => item.id === id)
      dispatch(updateAnecdote(id))
      dispatch(notifyAnecdote(`You have voted for ${votedAnecdote.content}`))
          
              setTimeout(() => {
                dispatch(notifyAnecdote(''))
              }, 5000)
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