import { createAnecdotes } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.newanecdote.value
        event.target.newanecdote.value = ''
        dispatch(createAnecdotes(content))
        dispatch(displayNotification(`${content} has been created`, 10))
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