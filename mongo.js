const mongoose = require('mongoose')

const contactScheme = new mongoose.Schema({
    name: String,
    number: String
});

const contact = mongoose.model('Contact', contactScheme);

contactScheme.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
    }
});

module.exports = contact;

