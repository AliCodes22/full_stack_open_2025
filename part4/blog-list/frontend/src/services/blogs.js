import axios from "axios";
const baseUrl = "/api/blogs";

const getTokenAndUser = () => {
  let token = "";
  const user = JSON.parse(window.localStorage.getItem("user"));

  if (user) {
    token = user.token;
  }

  return { token, user };
};
const getAll = async () => {
  const { token } = getTokenAndUser();

  const blogs = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return blogs.data;
};

const createBlog = async (newBlog) => {
  const { token } = getTokenAndUser();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const addLikes = async (blog) => {
  const id = blog._id;

  const { token } = getTokenAndUser();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, blog, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const { token } = getTokenAndUser();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export default { getAll, createBlog, addLikes, deleteBlog };
