import { deletePerson } from "../services/person";

const Persons = ({ persons, search, setPersons }) => {
  const removePerson = (id, name) => {
    window.alert(`Delete ${name} ?`);
    deletePerson(id);
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);
  };
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((person) => (
      <>
        <p key={person.id}>
          {person.name} {person.number}
          <span>
            <button
              onClick={() => {
                removePerson(person.id, person.name);
              }}
            >
              delete
            </button>
          </span>
        </p>
      </>
    ));
};

export default Persons;
