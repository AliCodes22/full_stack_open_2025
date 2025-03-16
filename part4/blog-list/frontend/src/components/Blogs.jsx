import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.data.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </>
  );
};
export default Blogs;
