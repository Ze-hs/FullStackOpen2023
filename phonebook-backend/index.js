require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/phonebook');

morgan.token('custom', (tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'),
  '-',
  tokens['response-time'](req, res),
  'ms',
  JSON.stringify(req.body),
].join(' '));

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('custom'));
app.use(express.static('build'));

// Get requests: Everyone
app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

// Get requeest: Specific person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Get request: info page
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const info = `<p>phonebook has info for ${count} people <br/> ${new Date()}</p>`;
      response.send(info);
    })
    .catch((error) => next(error));
});

// Delete request
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Post request: add new person
app.post('/api/persons', (request, response, next) => {
  const data = request.body;
  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  if (!data.name || !data.number) {
    return response.status(400).json({ error: 'Missing name or number' });
  }

  newPerson
    .save()
    .then((newRecord) => response.json(newRecord))
    .catch((error) => next(error));

  return null;
});

// Put request: update person
app.put('/api/persons/:id', (request, response, next) => {
  const newPerson = {
    name: request.body.name,
    number: request.body.number,
  };
  console.log(request.params.id);
  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Error handling middleware
const errorHandling = (error, request, response) => {
  console.log(error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  // eslint-disable-next-line no-else-return
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  return response.status(400);
};

app.use(errorHandling);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
