import { useSelector } from "react-redux";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const anecdotes = useSelector((state) => state);

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={sortedAnecdotes} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
