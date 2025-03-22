import { Link, useParams } from "react-router";
import { addComment, getSingleBlog } from "../services/blogs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useState } from "react";

const SingleBlog = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");

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

  const commentMutation = useMutation({
    mutationFn: addComment,
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

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitted", comment);
    if (!comment) {
      return;
    }

    const object = {
      id,
      comment,
    };

    console.log(object);
    commentMutation.mutate(object);
    setComment("");
  };

  if (blog.isLoading) {
    return <div>Loading...</div>;
  }

  const { title, author, url, likes, comments } = blog.data;
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

      <div>
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={onChange} value={comment} />
          <button type="submit" onClick={handleSubmit}>
            Add Comment
          </button>
          <ul>
            {comments.map((comment) => {
              return <li>{comment}</li>;
            })}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default SingleBlog;
