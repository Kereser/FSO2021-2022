import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNot } from './notificationReducer'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userReducer.actions

export const initializeUser = (newUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(newUser)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNot('Wrong username or password', 'failed', 5))
    }
  }
}

export default userReducer.reducer
