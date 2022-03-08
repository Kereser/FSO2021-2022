import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNot } from './notificationReducer'

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
    removingBlog(state, action) {
      return state.filter((b) => {
        return b.id !== action.payload
      })
    },
  },
})

export const { setBlogs, addingBlog, updateBlog, removingBlog } =
  blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (exception) {
      dispatch(
        setNot('Can not complete the operation successfully. ', 'failed', 5),
      )
    }
  }
}

export const upToDateBlogs = (id, newBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog(id, newBlog)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(setNot('Could not updated the blog.', 'failed', 5))
    }
  }
}

export const deleteBlog = (id, sendedToken) => {
  return async (dispatch) => {
    try {
      const token = blogService.setToken(sendedToken)
      await blogService.removeBlog(id, token)
      dispatch(removingBlog(id))
    } catch (exception) {
      dispatch(
        setNot('Could not complete the delete of the blog.', 'failed', 5),
      )
    }
  }
}

export const addBlog = (nBlog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(nBlog)
      dispatch(addingBlog(newBlog))
    } catch (exception) {
      dispatch(setNot('Could not update the blog. ', 'failed', 5))
    }
  }
}

export default blogReducer.reducer
