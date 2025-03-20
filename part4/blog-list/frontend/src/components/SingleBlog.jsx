import { Link, useParams } from "react-router";
import { getSingleBlog } from "../services/blogs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const SingleBlog = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const blog = useQuery({
    queryFn: () => getSingleBlog(id),
    queryKey: ["blog", id],
  });

  const likeMutation = useMutation({
    mutationFn: (updatedBlog) => blogService.addLikes(updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog", id],
      });
    },
  });

  const handleLikes = async () => {
    console.log("clicked");
    const updatedBlog = {
      ...blog.data,
      likes: blog.data.likes + 1,
    };

    likeMutation.mutate(updatedBlog);
  };

  console.log(blog.data);

  if (blog.isLoading) {
    return <div>Loading...</div>;
  }

  const { title, author, url, likes } = blog.data;
  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>{title}</h1>
      <Link to="#">url</Link>
      <p>
        {likes} likes
        <button onClick={handleLikes}>like</button>
      </p>
      <p>Added by {author}</p>
    </div>
  );
};

export default SingleBlog;
