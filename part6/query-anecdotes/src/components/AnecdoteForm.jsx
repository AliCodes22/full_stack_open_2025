import { useContext } from "react";
import { createNewAnecdote } from "../services/requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { notification, notificationDispatch } =
    useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({
      content,
      votes: 0,
    });
    notificationDispatch({
      type: "CREATE",
      payload: content,
    });
    event.target.anecdote.value = "";

    console.log(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
