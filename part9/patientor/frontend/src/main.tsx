import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
