import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import { NotificationContextProvider } from "./context/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </NotificationContextProvider>
);
