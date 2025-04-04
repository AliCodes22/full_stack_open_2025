import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification === "") {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
