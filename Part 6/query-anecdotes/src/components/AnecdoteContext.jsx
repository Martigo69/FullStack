import { createContext, useReducer, useContext } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }
}

export const AnecdoteContext = createContext()

export const AnecdoteContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {children} {/* ✅ this must be children, not props */}
    </AnecdoteContext.Provider>
  )
}

export const useAnecdoteValue = () => {
  const context = useContext(AnecdoteContext)
  if (!context) throw new Error('useAnecdoteValue must be used within AnecdoteContextProvider')
  return context[0]
}

export const useAnecdoteDispatch = () => {
  const context = useContext(AnecdoteContext)
  if (!context) throw new Error('useAnecdoteDispatch must be used within AnecdoteContextProvider')
  return context[1]
}
