import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const RecommendationPage = ({ show }) => {
  const currentUserResult = useQuery(ME)
  const allBooksResult = useQuery(ALL_BOOKS)

  if (currentUserResult.loading && allBooksResult) {
    return <div>loading...</div>
  }
  
  if (!show) {
    return null
  }

  const books = allBooksResult.data.allBooks.filter((b) => b.genres.includes(currentUserResult.data.me.favoriteGenre))
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{currentUserResult.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendationPage