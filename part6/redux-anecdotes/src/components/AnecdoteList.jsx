import { useDispatch } from "react-redux";
import { addVote, increaseVote } from "../reducers/anecdoteReducer";
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
                // const votedAnecdote = await vote(anecdote.id, {
                //   ...anecdote,
                //   votes: anecdote.votes + 1,
                // });

                const newObj = { ...anecdote, votes: anecdote.votes + 1 };

                const votedAnecdote = await dispatch(
                  increaseVote(newObj.id, newObj)
                );

                if (votedAnecdote) {
                  dispatch(
                    setNotification(`You voted for ${votedAnecdote.content}`)
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
