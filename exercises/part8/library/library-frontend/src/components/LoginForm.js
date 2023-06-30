import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-login-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()

    login({
      variables: {
        username,
        password
      }
    })

    setUsername('')
    setPassword('')
  }
  
  return (
    <div>
      <form onSubmit={submit}>
        <label>
          username: <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </label>
        <br />
        <label>
          password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm