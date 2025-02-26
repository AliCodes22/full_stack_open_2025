import { createSlice } from "@reduxjs/toolkit";
import {
  createNewAnecdote,
  getAnecdotes,
  vote,
} from "../services/anecdoteService";

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

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnecdote = (newObj) => {
  return async (dispatch) => {
    const newObject = await createNewAnecdote(newObj);
    dispatch(createAnecdote(newObject));
    return newObject;
  };
};

export const increaseVote = (id, obj) => {
  return async (dispatch) => {
    const voted = await vote(id, obj);
    dispatch(addVote(voted.id));
    return voted;
  };
};

export default anecdoteSlice.reducer;
