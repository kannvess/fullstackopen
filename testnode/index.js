require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())



// const requestLogger = (request, response, next) => {
// 	console.log('Method: ', request.method)
// 	console.log('Path: ', request.path)
// 	console.log('Body: ', request.body)
// 	console.log('---')
// 	next()
// }

// app.use(requestLogger)

// const url = `mongodb+srv://root:123@fullstackopen.aaxd5pd.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
// 	content: String,
// 	date: Date,
// 	important: Boolean,
// })

// noteSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString()
// 		delete returnedObject._id
// 		delete returnedObject.__v
// 	}
// })
  
// const Note = mongoose.model('Note', noteSchema)

// let notes = [
// 	{
// 		id: 1,
// 		content: "HTML is easy",
// 		date: "2022-05-30T17:30:31.098Z",
// 		important: true
// 	},
// 	{
// 		id: 2,
// 		content: "Browser can execute only Javascript",
// 		date: "2022-05-30T18:39:34.091Z",
// 		important: false
// 	},
// 	{
// 		id: 3,
// 		content: "GET and POST are the most important methods of HTTP protocol",
// 		date: "2022-05-30T19:20:14.298Z",
// 		important: true
// 	}
// ]

app.get('/', (request, response) => {
	response.send('<h1>hello world!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  Note.deleteOne({_id: request.params.id}).then(() => {
		response.status(204).end()
	})
})

// const generateId = () => {
// 	const maxId = notes.length > 0
// 		? Math.max(...notes.map(note => note.id))
// 		: 0
	
// 	return maxId + 1
// }

app.post('/api/notes', (request, response) => {
  const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({
			error: "content missing"
		})
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date()
	})

	note.save().then(savedNote => {
		response.json(savedNote)
	})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})