import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const createBlogRef = useRef()

  const addNewBlog = (newBlog) => {
    createBlogRef.current.toggleVisible()
    dispatch(addBlog(newBlog))
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogOut}>Logout</button>
          </p>
          <Toggleable ref={createBlogRef}>
            <CreateBlog createBlog={addNewBlog} />
          </Toggleable>
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
