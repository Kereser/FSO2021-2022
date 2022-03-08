import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog
      })
    },
  },
})

export const { setBlogs, addBlog, updateBlog } = blogReducer.actions

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

export default blogReducer.reducer
