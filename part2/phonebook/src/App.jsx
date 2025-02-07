import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { fetchPersons } from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState({
    name: "",
    number: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPersons().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter value={search} onChange={(e) => setSearch(e.target.value)} />
        <div>
          <h2>add a new</h2>
        </div>
        <PersonForm
          persons={persons}
          newName={newName}
          setNewName={setNewName}
          setPersons={setPersons}
        />
        <h2>Numbers</h2>
        {/* The list of names is filtered according to the search string 
            and is then mapped to show the list
        */}
        <Persons persons={persons} search={search} setPersons={setPersons} />
      </div>
    </>
  );
}

export default App;
