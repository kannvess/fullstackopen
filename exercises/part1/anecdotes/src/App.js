import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState({number: 0, votes: Array(anecdotes.length).fill(0)})
  const copy = selected.votes

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected.number]}
      <br />
      has {selected.votes[selected.number]} votes
      <br />
      <button onClick={() => setSelected({...selected, number: Math.floor(Math.random() * anecdotes.length)})}>
        next anecdote
      </button>
      <button onClick={() => {copy[selected.number] += 1; setSelected({...selected, votes: copy})}}>
        vote
      </button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[selected.votes.indexOf(Math.max(...selected.votes))]}
    </div>
  )
}

export default App