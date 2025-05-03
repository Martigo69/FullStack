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

export const displayNotification = (content, time) => {
  return dispatch => {
    dispatch(notifyAnecdote(content))
    setTimeout(() => {
      dispatch(notifyAnecdote(''))
    }, time * 1000)
  }
}


export default notificationSlice.reducer
