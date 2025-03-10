const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  console.log(message);

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
      {message}
    </div>
  );
};

export default Notification;
