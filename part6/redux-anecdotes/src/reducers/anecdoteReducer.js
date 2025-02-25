import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    addVote: (state, action) => {
      const anecdote = state.find((a) => a.id === action.payload);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },

    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
