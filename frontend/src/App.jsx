import { useState, useEffect } from 'react'

import FilterInput from './modules/filterInput';
import ContactList from './modules/contactList';
import ContactForm from './modules/contactForm';
import Notification from './modules/notification';

import contactServices from './services/contacts.js'

import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState({name: '', number: null, id: undefined})
  const [filter, setFilter] = useState('');
  const [notificationState, setNotificationState] = useState({message: null, color: null});

  const contactFetch = () => 
  {
    contactServices.getAll()
    .then(contacts => setPersons(contacts))
  }

  useEffect(contactFetch, []);

  const showNotification = (message, color) => 
  {
    setNotificationState({message, color})
    setTimeout(() => setNotificationState({message: null, color: null}), 5000)
  }
  
  const onNameHandler = (event) => 
  {
    let value = event.target.value;
    value = value.trim();
    setNewContact({...newContact, name: value})

    console.log("Name changer", newContact)
  }

  const onNumberHandler = (event) => 
  {
    const value = event.target.value;
    setNewContact({...newContact, number: value})

    console.log("Number changer", newContact)
  }

  const onFilterHandler = (event) => 
  {
    const value = event.target.value;
    setFilter(value)
    console.log("Filter Changer", filter)
  }

  const removeContactHandler = (id) => {
    const confirm = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`);
    const refresh = () => setPersons(persons.filter(person => person.id !== id));
    if(confirm) 
    {
      contactServices.removeContact(id)
      .then(() => refresh())
      .catch(() => {
        showNotification(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`, 'red')
        refresh();
      })
    } else {}
  }

  const onSubmitHandler = (event) => 
  {
    event.preventDefault()

    if(!isNaN(newContact.name)) return alert('Name cant be only numbers')
    
    const isExisting = persons.find(person => person.name === newContact.name || person.number === newContact.number);
    const refresh = (updatedContact) => setPersons(persons.map(person => person.id !== updatedContact.id ? person : updatedContact));

    if(isExisting) 
    {
      const dataToUpdate = isExisting.number == newContact.number ? {...isExisting, name: newContact.name} : {...isExisting, number: newContact.number};
      const confirm = window.confirm(`${isExisting.number == newContact.number ? isExisting.number: isExisting.name} is already added to phonebook, replace the old name with a new one?`)
      
      if(confirm) 
      {
        contactServices.updateContact(isExisting.id, dataToUpdate)
        .then(updatedContact => {
          refresh(updatedContact)
          showNotification(`Updated '${updatedContact.name}'`)
        })
      }
    }
    else if (!isExisting) 
    {
      contactServices.addContact(newContact)
      .then(contact => {
        setPersons(persons.concat(contact))
        showNotification(`Added '${contact.name}'`)
      })
    }

    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationState.message} color={notificationState.color} />
      <FilterInput onFilterHandler={onFilterHandler} />
      <h2>Add a new</h2>
      <ContactForm onSubmitHandler={onSubmitHandler} onNameHandler={onNameHandler} onNumberHandler={onNumberHandler}/> 
      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} removeContactHandler={removeContactHandler}/>
    </div>
  )
}

export default App