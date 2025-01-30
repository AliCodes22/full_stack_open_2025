const PersonForm = ({ persons, newName, setNewName, setPersons }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (persons.find((person) => person.name === newName.name)) {
          window.alert(`${newName.name} is already added to the phonebook`);
        } else {
          const newPerson = {
            id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
            name: newName.name,
            number: newName.number,
          };
          setPersons([...persons, newPerson]);
          setNewName({
            name: "",
            number: "",
          });
        }
      }}
    >
      <div>
        name:{" "}
        <input
          value={newName.name}
          onChange={(e) => {
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
  );
};

export default PersonForm;
