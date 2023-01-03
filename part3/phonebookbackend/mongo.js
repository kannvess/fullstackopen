const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('You must enter a password as a parameter: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@fullstackopen.aaxd5pd.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('person', personSchema)

mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        if (process.argv.length === 5) {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })

            person.save()
                .then(() => {
                    console.log(`added ${person.name} number ${person.number} to phonebook`)
                    mongoose.connection.close()
                })
        } else {
            Person.find({})
                .then((result) => {
                    console.log('phonebook:');
                    result.forEach(person => {
                        console.log(person.name, person.number)
                    })
                    mongoose.connection.close()
                })
        }
    })
    .catch(e => {
        console.log(e);
    })