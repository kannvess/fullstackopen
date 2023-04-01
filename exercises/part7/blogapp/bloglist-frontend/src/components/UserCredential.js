import { Button } from "react-bootstrap";

const UserCredential = ({ user, handleLogout }) => (
  <>
    {user.name} logged in <Button onClick={handleLogout}>logout</Button>
  </>
);

export default UserCredential