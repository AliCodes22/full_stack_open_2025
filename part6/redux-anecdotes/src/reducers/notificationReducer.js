import { createSlice } from "@reduxjs/toolkit";

let initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log(action);
      return action.payload;
    },
    removeNotification: () => {
      return "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
