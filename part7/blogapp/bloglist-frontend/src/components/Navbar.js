import UserCredential from "./UserCredential"
import { Link } from 'react-router-dom'

const Navbar = ({user, handleLogout}) => {
  return (
    <div style={{backgroundColor: 'lightgrey'}}>
      <Link style={{marginRight: 5}} to='/'>blogs</Link>
      <Link style={{marginRight: 5}} to='/users'>users</Link>
      <UserCredential user={user} handleLogout={handleLogout} />
    </div>
  )
}

export default Navbar