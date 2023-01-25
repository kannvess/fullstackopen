import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const Anecdote = ({anecdote, vote}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes).slice()
  
  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes ).map(anecdote =>
        <Anecdote
          anecdote={anecdote}
          vote={() => {
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`you voted '${anecdote.content}'`))
            setTimeout(() => {
              dispatch(removeNotification())
            }, 5000)
          }} 
          key={anecdote.id}
        />
      )}
    </div>
  )
}

export default AnecdoteList