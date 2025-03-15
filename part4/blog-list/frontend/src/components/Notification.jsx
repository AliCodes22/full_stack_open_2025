const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

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
      <p>
        Blog {message.title} by {message.author} added!
      </p>
    </div>
  );
};

export default Notification;
