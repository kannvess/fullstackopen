import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, vote}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  
  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes ).map(anecdote =>
        <Anecdote anecdote={anecdote} vote={() => dispatch(voteAnecdote(anecdote.id))} key={anecdote.id} />
      )}
    </div>
  )
}

export default AnecdoteList