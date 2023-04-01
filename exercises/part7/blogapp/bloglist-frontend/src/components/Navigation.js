import UserCredential from "./UserCredential"
import { Link } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap"

const Navigation = ({user, handleLogout}) => {
  const padding = {
    padding: 10
  }

  return (
    <div style={{backgroundColor: 'lightgrey'}}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <UserCredential user={user} handleLogout={handleLogout} />
    </div>
  )
}

export default Navigation