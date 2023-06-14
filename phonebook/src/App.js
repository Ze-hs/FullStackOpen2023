import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import phoneService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  const [style, setStyle] = useState("");

  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personFound = persons.find((p) => p.name === newName);

    if (personFound) {
      if (
        window.confirm(
          `${personFound.name} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        phoneService
          .update(personFound.id, { name: newName, number: newNumber })
          .then((data) => {
            const personUpdated = { ...personFound, number: newNumber };
            setPersons(
              persons.map((person) =>
                person.id !== personFound.id ? person : personUpdated
              )
            );
          });
      }
    } else {
      phoneService
        .create({ name: newName, number: newNumber })
        .then((data) => {
          setPersons(persons.concat(data));
          notify(`Added ${data.name}`, "success");
        })
        .catch((error) => {
          notify(error.response.data.error, "error");
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.log(error);
          notify(
            `Information on ${person.name} has already been removed from the server`,
            "error"
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const notify = (msg, type) => {
    setMessage(msg);
    setStyle(type);

    setTimeout(() => {
      setMessage(null);
    }, 2500);
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Display namesToShow={namesToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
