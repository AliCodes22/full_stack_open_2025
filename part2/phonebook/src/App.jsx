import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState({
    id: persons.length + 1,
    name: "",
    number: "",
  });

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (persons.find((person) => person.name === newName.name)) {
              window.alert(`${newName.name} is already added to the phonebook`);
            } else {
              setPersons([...persons, newName]);
              setNewName({
                id: persons.length + 1,
                name: "",
                number: "",
              });
            }

            console.log("button clicked", e.target);
          }}
        >
          <div>
            name:{" "}
            <input
              value={newName.name}
              onChange={(e) => {
                console.log("name", e.target.value);
                setNewName({
                  ...newName,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div>
            number:{" "}
            <input
              value={newName.number}
              onChange={(e) => {
                setNewName({
                  ...newName,
                  number: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map((person) => (
          <p key={person.id}>{person.name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
