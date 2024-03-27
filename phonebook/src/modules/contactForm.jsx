const ContactForm = ({ onSubmitHandler, onNameHandler, onNumberHandler }) => {
    return (
      <form onSubmit={onSubmitHandler}>
        <label>Name: 
          <input onChange={onNameHandler} type='text' required/>
        </label>
        <label>number: 
          <input onChange={onNumberHandler} type='text' pattern='[0-9]+' required />
        </label>
        <button type="submit">add</button>
      </form>
    )
  }

  export default ContactForm;