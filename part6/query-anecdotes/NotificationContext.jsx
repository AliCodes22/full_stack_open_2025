import { createContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `${action.payload} created`;
    case "VOTED":
      return `anecdote ${action.payload} voted`;
    case "CLEAR":
      return "";

    default:
      return "";
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
