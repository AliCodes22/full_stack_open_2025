import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        color: "red",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
