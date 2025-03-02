import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { addNewVote, getAnecdotes } from "./services/requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const { notification, notificationDispatch } =
    useContext(NotificationContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  const newVoteMutation = useMutation({
    mutationFn: ({ id, ...anecdote }) => addNewVote(id, anecdote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });

  const handleVote = (anecdote) => {
    console.log("clicked");

    newVoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    notificationDispatch({
      type: "VOTED",
      payload: anecdote.content,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification content={notification} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                console.log(anecdote);
                handleVote(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
