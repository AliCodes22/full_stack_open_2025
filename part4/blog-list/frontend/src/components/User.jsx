import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/users";
import { Link, useParams } from "react-router";

const User = () => {
  const { id } = useParams();

  const user = useQuery({
    queryFn: () => {
      return getUser(id);
    },
    queryKey: ["user", id],
  });

  console.log(user.data);
  if (user.isLoading) {
    return <div>Loading..</div>;
  }

  if (user.isError) {
    return <div>Unable to fetch user</div>;
  }

  return (
    <div>
      <h1>{user.data.name}</h1>
      <p>Added Blogs</p>
      <ul>
        {user.data.blogs.map((blog) => {
          return (
            <li>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
