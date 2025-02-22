import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

const generateId = () => {
  Number((Math.random() * 1000000).toFixed(10));
};

const App = () => {
  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = "";
    store.dispatch({
      type: "NEW_NOTE",
      payload: {
        content,
        important: false,
        id: generateId(),
      },
    });
  };

  const toggleImportance = (id) => {
    store.dispatch({
      type: "TOGGLE_IMPORTANCE",
      payload: { id },
    });
  };

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
