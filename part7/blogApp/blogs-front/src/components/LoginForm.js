import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ newLoggin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      username,
      password,
    }

    newLoggin(newUser)
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

LoginForm.prototype = {
  newLoggin: PropTypes.func.isRequired,
}

export default LoginForm
