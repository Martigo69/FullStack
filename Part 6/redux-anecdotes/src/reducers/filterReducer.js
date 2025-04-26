import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { searchAnecdote } = filterSlice.actions
export default filterSlice.reducer
