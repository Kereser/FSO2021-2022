import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const updateAnecdote = action.payload
      return state.map(a => {
        return a.id === updateAnecdote.id ? updateAnecdote : a
      })
    },
    setNotes(state, action) {
      return action.payload
    },
    appendNote(state, action) {
      state.push(action.payload)
    }
  },
})

export const { vote, setNotes, appendNote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const updateVotes = (anecdote) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(vote(updateAnecdote))
  }
}

export default anecdoteSlice.reducer