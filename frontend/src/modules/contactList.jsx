const ContactList = ({ persons, filter, removeContactHandler }) => {
    const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
      <div>
        {
        contactsToShow.map(person =>
          <label key={person.id} style={{ display: 'block'}}>
            {person.name} {person.number}
            <button onClick={() => removeContactHandler(person.id)}>Delete</button>
          </label>
            
          )
        }
      </div>
    )
}

export default ContactList;