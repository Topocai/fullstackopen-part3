require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

app.use(express.static('dist'));

app.use(cors());
app.use(express.json());

let morgan = require('morgan');

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url)
.then(() => console.log("[MONGOOSE] Connected to MongoDB"))
.catch(err => console.error("[MONGOOSE] Error in conection", err));


const ContactModel = require('./mongo.js');

app.get('/api/persons', (req, res) => {
    ContactModel.find({}).then(contacts => {
      res.json(contacts);
    });
});

app.put('/api/persons/:id', (req, res) => {

    const id = req.params.id
    const body = req.body

    if(body.name === undefined || body.number === undefined)
        return res.status(400).json({ error: 'Name or number is missing' });

    ContactModel.findByIdAndUpdate(id, {...body})
    .then(contact => res.json(contact))
    .catch(() => res.status(404).end())

});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    ContactModel.findById(id)
    .then(contact => res.json(contact))
    .catch(err => 
    {
      console.error(err);
      res.status(404).end();
    })
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    ContactModel.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(() => res.status(404).end())
});

app.get('/info', (req, res) => {
    const date = new Date();
    ContactModel.find({}).then(contacts => {
      res.send(`<p>Phonebook has info for ${contacts.length} people<br/>${date}</p>`);
    })
    .catch(() => res.status(404).end());
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) 
  {
    return res.status(400).json({ 
      error: 'Name or number is missing' 
    });
  }

  ContactModel.find({}).then(contacts => 
  {
    if(contacts.find(person => person.name === body.name)) 
    {
      return res.status(409).json({ 
        error: 'Name has already in the phonebook' 
      });
    }
    else if (contacts.find(person => person.number === body.number)) 
    {
      return res.status(409).json({ 
        error: 'Number has already in the phonebook' 
      });
    }

    const newPerson = new ContactModel({
      name: body.name,
      number: body.number
    });

    newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
  });

});
const PORT = process.env.PORT || 3001;

app.listen(PORT);