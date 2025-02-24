import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const vote = async (id) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`);
    console.log(response);
    const updatedAnecdote = { ...response, votes: response.votes + 1 };

    return updatedAnecdote;
  } catch (error) {
    console.log(error);
  }
};
