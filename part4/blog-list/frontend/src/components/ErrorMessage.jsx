const ErrorMessage = ({ error }) => {
  if (error === null) {
    return null;
  }
  console.log(error);

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "2px solid red",
        backgroundColor: "#eaf0ea",
        color: "red",
        borderRadius: "5px",
        fontWeight: "bold",
      }}
    >
      Wrong username or password
    </div>
  );
};

export default ErrorMessage;
