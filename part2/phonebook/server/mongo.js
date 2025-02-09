const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please give password as argument");
  process.exit(2);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://alidev94:${password}@full-stack-open.j1j8i.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=full-stack-open`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name,
  number,
});

if (process.argv.length < 4) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (name && number) {
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
