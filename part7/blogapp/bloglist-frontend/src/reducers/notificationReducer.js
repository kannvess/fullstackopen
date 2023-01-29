import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    messageCategory: ""
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload
    },
    setNotificationCategory(state, action) {
      state.messageCategory = action.payload
    }
  }
})

export const setMessage = (message, messageCategory) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    dispatch(setNotificationCategory(messageCategory))

    setTimeout(() => {
      dispatch(setNotification(null))
      dispatch(setNotificationCategory(""))
    }, 5000)
  }
}

export const { setNotification, setNotificationCategory } = notificationSlice.actions
export default notificationSlice.reducer