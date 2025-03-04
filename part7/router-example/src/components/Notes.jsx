import React from "react";
import { Link } from "react-router-dom";

const Notes = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => {
          return (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notes;
