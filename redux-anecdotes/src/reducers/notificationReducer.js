import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification: (state, action) => {
      state = action.payload
      return state
    },
    removeNotification: (state, action) => {
      state = ''
      return state
    }
  }
})
export const {createNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(createNotification(message))
    setTimeout(() => {
      console.log(`i appeared after ${time} secs!`)
      dispatch(removeNotification())
    }, time)
  }
}