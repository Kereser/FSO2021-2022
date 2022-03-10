import React, { useEffect } from 'react'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/loginReducer'

import { Container } from '@mui/material'
import { Header } from './materialUIComponents/Header/Header'
import Body from './materialUIComponents/Body/Body'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const login = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.clear()
    dispatch(setLogin(null))
  }

  return (
    <Container>
      <div>
        <Notification notification={notification} />
        {login === null ? (
          <div>
            <LoginForm />
          </div>
        ) : (
          <div>
            <Header login={login} handleLogOut={handleLogOut} />
            <Body />
          </div>
        )}
      </div>
    </Container>
  )
}

export default App
