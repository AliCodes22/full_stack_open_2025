import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = async () => {
  const result = await axios.get(baseUrl);

  return result.data;
};

export const createNote = async (newNote) => {
  const note = await axios.post(baseUrl, newNote);

  return note.data;
};
