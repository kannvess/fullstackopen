const UserCredential = ({ user, handleLogout }) => (
  <>
    {user.name} logged in <button onClick={handleLogout}>logout</button>
  </>
);

export default UserCredential