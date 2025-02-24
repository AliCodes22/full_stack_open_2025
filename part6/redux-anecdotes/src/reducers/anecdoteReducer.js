import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      });
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
