import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })
  
  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>
  
  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name,
        setBornTo: parseInt(born)
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <label htmlFor="name">
            name:
            {' '}
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map((a) => 
                <option key={a.name} value={a.name}>{a.name}</option>
              )}
            </select>
          </label>
          <br />
          <label htmlFor="born">
            born:
            {' '}
            <input id="born" type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
          </label>
          <br />
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
