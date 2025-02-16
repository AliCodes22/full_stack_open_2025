const Blog = ({ blog }) => {
  console.log("rending blog:", blog);
  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      {blog.title} {blog.author}
    </div>
  );
};

export default Blog;
