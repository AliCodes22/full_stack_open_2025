import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  let token = "";
  const user = JSON.parse(window.localStorage.getItem("user"));

  if (user) {
    token = user.token;
  }
  const blogs = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return blogs.data;
};

const createBlog = async (newBlog) => {
  let token = "";

  const user = JSON.parse(window.localStorage.getItem("user"));

  if (user) {
    token = user.token;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  console.log(response);

  return response.data;
};

export default { getAll, createBlog };
