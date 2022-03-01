import { connect } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
import { setNot } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"


const Anecdotes = ({ filter, anecdotes, updateVotes, setNot }) => {

  const vote = (anecdote) => {
    setNot(`You voted ${anecdote.content}`, 5)
    updateVotes(anecdote)
  }

  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes) 
  const sortedAndFilterAnecdotes = sortedAnecdotes.filter(a => {
    return a.content.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    
    <div>
      {sortedAndFilterAnecdotes.map(anecdote =>
        <Anecdote 
          anecdote={anecdote}
          key={anecdote.id}
          handleClick={() => vote(anecdote)} 
        />
      )}
    </div>
  )
}

const mapStateToProps = state => { 
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  updateVotes,
  setNot
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)