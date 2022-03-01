import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNot } from '../reducers/notificationReducer'


const AnecdoteForm = ({ createAnecdote, setNot }) => {

  const handleSubmit = async e => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    createAnecdote(content)
    setNot(`'${content}' anecdote successfully created.`, 3)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          name="anecdote"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNot
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)