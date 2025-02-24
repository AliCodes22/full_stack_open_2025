import { useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { vote } from "../services/anecdoteService";
const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={async () => {
                const anecdote = await vote(anecdote.id);

                if (anecdote) {
                  dispatch(addVote(anecdote.id));
                  dispatch(
                    setNotification(`You voted for ${anecdote.content}`)
                  );
                }
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
