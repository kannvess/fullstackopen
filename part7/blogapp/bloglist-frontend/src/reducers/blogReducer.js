import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    initializeBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(initializeBlogs(blogs))
  }
}

export const newBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch(appendBlog(response))
  }
}

export const { initializeBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer