import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notifications',
  initialState: {},
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationReducer.actions

export const setNot = (message, state) => {
  return (dispatch) => {
    const newNotification = { message, state }
    dispatch(setNotification(newNotification))
  }
}

export default notificationReducer.reducer
