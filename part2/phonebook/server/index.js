const express = require("express");

const app = express();

const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log("App running");
});

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>  
    <br/>
    <p>${date}</p>
    `);
});

// get person by id
app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  const person = persons.find((person) => person.id === id);

  if (!person) {
    res.status(404).end();
  }

  res.status(200).json(person);
});

// add person
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      message: "Please fill out all the fields",
    });
  }

  const foundPerson = persons.find((person) => person.name === name);

  if (foundPerson) {
    return res.status(409).json({
      message: "Name already exists",
    });
  }

  const id =
    persons.length > 0
      ? Math.max(...persons.map((person) => Number(person.id))) + 1
      : 1;
  const newPerson = { name, number, id };
  persons.push(newPerson);

  res.status(201).json(newPerson);
});
