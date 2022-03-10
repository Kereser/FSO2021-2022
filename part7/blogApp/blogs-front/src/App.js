import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import CreateBlog from './components/CreateBlog'
import Users from './components/Users'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/loginReducer'

import { Route, Routes } from 'react-router-dom'

import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
} from '@mui/material'

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

  const createBlogRef = useRef()

  const addNewBlog = (newBlog) => {
    createBlogRef.current.toggleVisible()
    dispatch(addBlog(newBlog))
  }

  // const style = {
  //   padding: 5,
  // }

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
            <AppBar>
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Button color='inherit' href='/'>
                    Blogs
                  </Button>
                  <Button color='inherit' href='/users'>
                    Users
                  </Button>
                </Box>
                <Typography>
                  {login.name} logged in{' '}
                  <Button onClick={handleLogOut} color='inherit'>
                    Logout
                  </Button>
                </Typography>
              </Toolbar>
            </AppBar>
            <Box>
              <h2 style={{ marginTop: 72 }}>blogs</h2>
              <Routes>
                <Route path='/users' element={<Users />} />
                <Route
                  path='/'
                  element={
                    <>
                      <Toggleable ref={createBlogRef}>
                        <CreateBlog createBlog={addNewBlog} />
                      </Toggleable>
                      <Blog />
                    </>
                  }
                />
                <Route path='/users/:id' element={<Users id={true} />} />
                <Route path='/blogs/:id' element={<Blog />} />
              </Routes>
            </Box>
          </div>
        )}
      </div>
    </Container>
  )
}

export default App
