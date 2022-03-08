import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addingBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog
      })
    },
  },
})

export const { setBlogs, addingBlog, updateBlog } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const upToDateBlogs = (id, newBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(id, newBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const addBlog = (nBlog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(nBlog)
    dispatch(addingBlog(newBlog))
  }
}

export default blogReducer.reducer
