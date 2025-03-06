import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from "react-router-dom";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Users from "./components/Users";
import Note from "./components/Note";
import { Children, useState } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const match = useMatch("/notes/:id");
  console.log(match);

  const login = (user) => {
    setUser(user);
  };

  const padding = {
    padding: 5,
  };

  const notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ];
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/notes">
          Notes
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            Login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={login} />} />
      </Routes>

      <footer>
        <br />
        <em>Note app, Department of Computer Science</em>
      </footer>
    </div>
  );
}

export default App;
