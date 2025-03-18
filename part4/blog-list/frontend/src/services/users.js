import axios from "axios";

export const getAllUsers = async () => {
  const response = await axios.get("/api/users");

  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);

  return response.data;
};
