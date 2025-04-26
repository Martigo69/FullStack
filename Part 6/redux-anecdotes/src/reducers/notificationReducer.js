import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifyAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { notifyAnecdote } = notificationSlice.actions
export default notificationSlice.reducer
