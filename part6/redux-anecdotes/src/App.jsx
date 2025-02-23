import { useSelector } from "react-redux";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

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
