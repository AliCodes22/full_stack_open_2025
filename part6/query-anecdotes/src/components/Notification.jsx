import { useContext, useEffect } from "react";
import NotificationContext from "../../NotificationContext";

const Notification = ({ content }) => {
  const { notification, notificationDispatch } =
    useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!notification) return null;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000); // Clears after 5 seconds

      return () => clearTimeout(timer); // Cleanup on re-render
    }
  }, [notification]);

  return <div style={style}>{content}</div>;
};

export default Notification;
