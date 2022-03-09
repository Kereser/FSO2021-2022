import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNot } from './notificationReducer'

const loginReducer = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
  },
})

export const { setLogin } = loginReducer.actions

export const initializeLogin = (newUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(newUser)
      dispatch(setLogin(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNot('Wrong username or password', 'failed', 5))
    }
  }
}

export default loginReducer.reducer
