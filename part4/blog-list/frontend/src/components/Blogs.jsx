import Blog from "./Blog";
import { Link } from "react-router";

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.data.map((blog) => (
        <Link to={`/blogs/${blog._id}`}>
          <Blog key={blog._id} blog={blog} />
        </Link>
      ))}
    </>
  );
};
export default Blogs;
