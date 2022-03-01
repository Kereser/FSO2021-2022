import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    setNullNotification(state, action) {
      console.log(action)
      return action.payload
    }
  },
})

export const { setNotification, setNullNotification } = notificationSlice.actions

let timeId = undefined;
export const setNot = (content, time) => {
  return dispatch => {
    dispatch(setNotification(content))
    if (timeId === undefined) {
      timeId = setTimeout(() => {
        dispatch(setNullNotification(null))
      }, time * 1000)
    }
    else {
      clearTimeout(timeId)
      timeId = setTimeout(() => {
        dispatch(setNullNotification(null))
      }, time * 1000)
    }
    
  }
}

export default notificationSlice.reducer