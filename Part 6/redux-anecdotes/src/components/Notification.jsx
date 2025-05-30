import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification