const mongoose = require('mongoose')

if(process.argv.length < 3)
{
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://topocaidev:${password}@m0-cluster.jhkq2qf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(url).then(() => 
{
    const contactScheme = new mongoose.Schema({
        name: String,
        number: String
    });
    
    const contact = mongoose.model('Contact', contactScheme);
    
    if(process.argv.length === 3) 
    {
        contact.find({}).then(result => {
            console.log('phonebook:');
            result.forEach(contact => {
                console.log(contact.name, contact.number);
            });
            mongoose.connection.close();
        })
        .catch(err => {
            console.log(err);
            mongoose.connection.close();
        });
    }
    else if (process.argv.length === 4)
    {
        console.log("Please provide a number for the contact")
        process.exit(1)
    }
    else 
    {
        const contactName = process.argv[3];
        const contactNumber = process.argv[4];
        
        const newContact = new contact({
            name: contactName,
            number: contactNumber
        });

        newContact.save().then(() => {
            console.log(`added ${contactName} number ${contactNumber} to phonebook`, newContact);
            mongoose.connection.close();
        })
        .catch(err => {
            console.log(err)
            mongoose.connection.close();
        })
    }   
})
.catch(err => {
    console.log(err)
    process.exit(1)
});

