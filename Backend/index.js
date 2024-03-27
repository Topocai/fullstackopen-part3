const express = require('express');
const app = express();

app.use(express.json());

let morgan = require('morgan');
morgan.token('reqbody', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person) 
    {
        res.json(person);
    } 
    else 
    {
        res.status(404).redirect("https://http.cat/404");
    } 
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people<br/>${date}</p>`);
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  const newPerson = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number
  }

  if (!body.name || !body.number) 
  {
    return res.status(400).json({ 
      error: 'Name or number is missing' 
    });
  }
  if(persons.find(person => person.name === newPerson.name)) 
  {
    return res.status(409).json({ 
      error: 'Name has already in the phonebook' 
    });
  }
  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);
});
const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));