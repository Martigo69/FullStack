import { searchAnecdote } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {

    const dispatch = useDispatch()

    const filter = (event) => {
        dispatch(searchAnecdote(event.target.value))
      }

    return (
        <div> 
            <input name='searchanecdote' onChange={filter} placeholder='Filter Anecdote'/>
        </div>
    )

}

export default AnecdoteFilter