const mongoose = require('mongoose')

const contactScheme = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{2,12}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

const contact = mongoose.model('Contact', contactScheme)

contactScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

module.exports = contact
