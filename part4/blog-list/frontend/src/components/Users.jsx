import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { Link } from "react-router";

const Users = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (users.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Users</h2>
          <ul>
            {users.data.map((user) => {
              return (
                <li>
                  <Link to={`/users/${user._id}`}>{user.username}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>Blogs created</p>
          <div>
            {users.data.map((user) => {
              return <p>{user.blogs.length}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
