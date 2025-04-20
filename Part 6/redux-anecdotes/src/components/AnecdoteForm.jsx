import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.newanecdote.value))
        event.target.newanecdote.value=''
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