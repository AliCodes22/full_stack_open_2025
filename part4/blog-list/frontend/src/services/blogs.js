import axios from "axios";
import { getTokenAndUser } from "./getAuthConfig";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const { config } = getTokenAndUser();
  const blogs = await axios.get(baseUrl, config);
  return blogs.data;
};

const createBlog = async (newBlog) => {
  const { config } = getTokenAndUser();
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLikes = async (blog) => {
  const { config } = getTokenAndUser();
  const id = blog._id;
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const { config } = getTokenAndUser();
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export const getSingleBlog = async (id) => {
  const { config } = getTokenAndUser();
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

export const addComment = async (object) => {
  const { config } = getTokenAndUser();

  const { id, comment } = object;

  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    object,
    config
  );

  return response.data;
};

export default { getAll, createBlog, addLikes, deleteBlog };
