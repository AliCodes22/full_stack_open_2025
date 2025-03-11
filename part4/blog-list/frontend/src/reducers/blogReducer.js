import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    createNewBlog: (state, action) => {
      const { title, author, url } = action.payload;
      const newBlog = { title, author, url };
      state.push(newBlog);
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (createdBlog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(createdBlog);
    dispatch(createNewBlog(newBlog));
  };
};
