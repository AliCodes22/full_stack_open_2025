import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { createNewAnecdote } from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;

    if (!anecdote) {
      return;
    }

    const newAnecdote = await createNewAnecdote(anecdote);
    console.log(newAnecdote);

    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`${newAnecdote.content} created`));

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
