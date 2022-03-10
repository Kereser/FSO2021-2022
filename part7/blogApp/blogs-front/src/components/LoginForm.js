import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeLogin } from '../reducers/loginReducer'

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

    dispatch(initializeLogin(newUser))
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <Typography component='h1' variant='h4'>
        Log in to application
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            size='small'
            label='Username'
            id='input-username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='Password'
            id='input-password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant='contained' color='primary' type='Submit'>
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
