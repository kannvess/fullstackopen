import axios from 'axios'

const baseUrl = '/api/persons'

const getPersons = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const erase = id => {
	const url = `${baseUrl}/${id}`
	const request = axios.delete(url)
	
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const url = `${baseUrl}/${id}`
	const request = axios.put(url, newObject)

	return request.then(response => response.data)
}

export default { getPersons, create, erase, update }