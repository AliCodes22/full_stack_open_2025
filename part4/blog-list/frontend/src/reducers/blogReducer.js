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
    addNewBlog: (state, action) => {
      const { title, author, url } = action.payload;
      const newBlog = { title, author, url };
      state.push(newBlog);
    },
    likeBlog: (state, action) => {
      return state.map((blog) =>
        blog._id === action.payload._id
          ? { ...blog, likes: action.payload.likes }
          : blog
      );
    },
  },
});

// API calls

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlogAction = (createdBlog) => {
  return async (dispatch) => {
    const blog = await blogService.createBlog(createdBlog);
    dispatch(addNewBlog(blog));
  };
};

export const addLikeAction = (blog) => {
  return async (dispatch) => {
    const newlyLikedBlog = await blogService.addLikes(blog);
    dispatch(likeBlog(newlyLikedBlog));
  };
};

export const { setBlogs, addNewBlog, likeBlog } = blogSlice.actions;

export default blogSlice.reducer;
