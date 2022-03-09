import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import CreateBlog from './components/CreateBlog'
import Users from './components/Users'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/loginReducer'

import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
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

  const style = {
    padding: 5,
  }

  return (
    <div>
      <Notification notification={notification} />
      {login === null ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <div>
          <Link style={style} to="/">
            Home
          </Link>
          <Link style={style} to="/users">
            Usuarios
          </Link>
          <h2>blogs</h2>
          <p>
            {login.name} logged in{' '}
            <button onClick={handleLogOut}>Logout</button>
          </p>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route
              path="/"
              element={
                <>
                  <Toggleable ref={createBlogRef}>
                    <CreateBlog createBlog={addNewBlog} />
                  </Toggleable>
                  <Blogs blogs={blogs} />
                </>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
