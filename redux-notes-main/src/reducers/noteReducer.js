import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(2));
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId(),
      });
    },
    toggleImportance(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      return state.map((item) => (item.id === id ? noteToChange : item));
    },
  },
});
