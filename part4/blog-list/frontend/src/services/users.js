import axios from "axios";

export const getAllUsers = async () => {
  const response = await axios.get("/api/users");

  return response.json();
};
