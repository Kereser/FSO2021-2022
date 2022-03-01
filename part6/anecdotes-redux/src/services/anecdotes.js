import axios from "axios";

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const req = await axios.get(baseURL)
  return req.data
}

const createNew = async (content) => {
  const anec = { content, votes: 0 }
  const req = await axios.post(baseURL, anec)
  return req.data
}

const updateAnecdote = async anecdote => {
  const updateAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const req = await axios.put(`${baseURL}/${anecdote.id}`, updateAnecdote)
  return req.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateAnecdote }