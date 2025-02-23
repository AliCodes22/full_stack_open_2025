import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;

    if (!anecdote) {
      return;
    }

    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`${anecdote} created`));

    e.target.anecdote.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>create new</h2>
        <input
          name="anecdote"
          onChange={(e) => console.log(e.target.anecdote.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
