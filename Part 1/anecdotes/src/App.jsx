import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Anecdote = ({text, count}) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {count} votes</p>
    </div>
  )
}

const MostVotedAnecdote = ({anecdotes, allVotes}) => {
  const maxVoteIndex = allVotes.indexOf(Math.max(...allVotes))
  if (Math.max(...allVotes) === 0) {
    return (
      <p>No votes yet</p>
    )
  }
  return (
    <div>
      <p>{anecdotes[maxVoteIndex]}</p>
      <p>has {Math.max(...allVotes)} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0))

  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes]
    newAllVotes[selected] += 1
    setAllVotes(newAllVotes)
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} count={allVotes[selected]} />
      <Button onClick={handleVoteClick} text="vote"/>
      <Button onClick={handleAnecdoteClick} text="next anecdote"/>
      <Header name="Anecdote with most votes" />
      <MostVotedAnecdote anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

export default App