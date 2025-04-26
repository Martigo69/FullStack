import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { notifyAnecdote } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.newanecdote.value
        event.target.newanecdote.value = ''
    
        dispatch(createAnecdote(content))
        dispatch(notifyAnecdote(`${content} has been created`))
    
        setTimeout(() => {
          dispatch(notifyAnecdote(''))
        }, 5000)
      }

    return (
        <div> 
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='newanecdote'/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm