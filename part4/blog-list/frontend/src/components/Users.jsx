import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";

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
              return <li>{user.username}</li>;
            })}
          </ul>
        </div>
        <div>
          <p>Blogs created</p>
          <ul>
            {users.data.map((user) => {
              return <li>{user.blogs.length}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
