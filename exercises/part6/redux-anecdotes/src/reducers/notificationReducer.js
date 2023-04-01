import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

let timeout

export const setNotification = (content, duration) => {
  return (dispatch) => {
    dispatch(addNotification(content))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export const { addNotification, removeNotification, getNotification } = notificationSlice.actions
export default notificationSlice.reducer