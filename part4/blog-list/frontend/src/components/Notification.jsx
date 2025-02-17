const Notification = ({ message }) => {
  if (message === null) {
    return;
  }

  const { title, author } = message;
  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "2px solid green",
        backgroundColor: "#eaf0ea",
        color: "green",
        borderRadius: "5px",
        fontWeight: "bold",
      }}
    >
      A new blog {title} by {author} added
    </div>
  );
};

export default Notification;
