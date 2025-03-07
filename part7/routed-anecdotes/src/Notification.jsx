const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div>
      <p>A new anecdote {notification} created!</p>
    </div>
  );
};

export default Notification;
