import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { addNewVote, getAnecdotes } from "./services/requests";

const App = () => {
  const queryClient = new QueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    staleTime: 10000,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newVoteMutation = useMutation({
    mutationFn: addNewVote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });

  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  const anecdotes = data;
  console.log(anecdotes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
