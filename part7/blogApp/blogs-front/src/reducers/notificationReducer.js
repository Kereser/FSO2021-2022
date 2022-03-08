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

let timeOutID = undefined
export const setNot = (message, state, time) => {
  return (dispatch) => {
    const newNotification = { message, state }
    dispatch(setNotification(newNotification))
    if (timeOutID === undefined) {
      timeOutID = setTimeout(() => {
        dispatch(setNotification({ message: null, state: null }))
      }, time * 1000)
    } else {
      clearTimeout(timeOutID)
      timeOutID = setTimeout(() => {
        dispatch(setNotification({ message: null, state: null }))
      }, time * 1000)
    }
  }
}

export default notificationReducer.reducer
