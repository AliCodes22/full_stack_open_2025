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
    },
  });

  return blogs.data;
};

export default { getAll };
