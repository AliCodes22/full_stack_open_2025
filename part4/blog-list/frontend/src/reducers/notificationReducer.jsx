import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newBlogNotification: (state, action) => {
      const blog = action.payload;
      state.message = `Blog ${blog.title} by ${blog.author} created!`;
    },
    likeNotification: (blogName) => {
      state.message = `${blogName} liked`;
    },

    clearNotification: (state) => {
      state.message = null;
    },
  },
});

export const { newBlogNotification, likeNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
