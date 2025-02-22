const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://spiketyson:${password}@cluster0.dutad.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

console.log('connecting to', url)

mongoose .connect(url)

const personsSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Persons = mongoose.model('Persons', personsSchema)

if (process.argv.length === 3) {
  Persons.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const persons = new Persons({
    'name': process.argv[3],
    'number': process.argv[4]
  })
  persons.save().then(() => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}



