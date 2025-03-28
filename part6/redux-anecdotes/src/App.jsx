import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { getAnecdotes } from "./services/anecdoteService";
import { fetchAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnecdotes());
  }, [dispatch]);

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList anecdotes={sortedAnecdotes} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
