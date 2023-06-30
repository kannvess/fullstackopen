import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks
  const booksToShow = genre !== '' ? books.filter((b) => b.genres.includes(genre)) : books

  let genres = []
  books.forEach((b) => {
    b.genres.forEach((g) => {
      if (!genres.includes(g)) {
        genres = genres.concat(g)
      }
    })
  });

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) =>
        <button onClick={() => setGenre(g)} key={g}>{g}</button>
      )}
    </div>
  )
}

export default Books
