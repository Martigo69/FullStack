import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(anecdote =>
        anecdote.id !== updated.id ? anecdote : updated
      )
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdotes))
  }
}

export const alterAnecdotes = content => {
  return async dispatch => {
    const updatedAnecdotes = await anecdoteService.updateNew(content)
    dispatch(updateAnecdote(updatedAnecdotes))
  }
}

export default anecdoteSlice.reducer
