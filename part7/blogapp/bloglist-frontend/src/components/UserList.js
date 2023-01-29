import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({users}) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => 
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList