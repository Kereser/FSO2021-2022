import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      username,
      password,
    }

    dispatch(initializeUser(newUser))
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            id="input-username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id="input-password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="Submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
