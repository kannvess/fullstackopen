const express = require('express')
const app = express()

app.use(express.json())

let persons = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Hello Phonebook backend!</h1>')
})

app.get('/info', (request, response) => {
	response.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	return Math.random() * 9999999999
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		response.status(400).json({
			error: 'name/number must not be empty'
		})
	}

	if (persons.find(person => person.name === body.name)) {
		response.status(400).json({
			error: `${body.name} already exist`
		})
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number
	}

	persons = persons.concat(person)

	response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})