import { useState } from "react";
import useField from "./hooks/useField";

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(content.value);

    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const clearFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={clearFields}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
