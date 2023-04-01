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
    },
    likeBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(initializeBlogs(blogs))
  }
}

export const newBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.create(object)
    dispatch(appendBlog(blog))
  }
}

export const updateBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.update(object)
    dispatch(likeBlog(blog))
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    dispatch(deleteBlog(blogId))
  }
}

export const { initializeBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer