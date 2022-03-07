import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    state: null,
  })

  useEffect(() => {
    async function fetchedData() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        console.error(exception)
      }
    }
    fetchedData()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newLoggin = async (newUser) => {
    try {
      const user = await loginService.login(newUser)
      setUser(user)
      console.log(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setNotification({
        message: 'Wrong username or password',
        state: 'failed',
      })
      setTimeout(() => {
        setNotification({ message: null, state: null })
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlogRef = useRef()

  const addNewBlog = async (newBlog) => {
    try {
      createBlogRef.current.toggleVisible()
      const createdBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNotification({
        message: `Blog '${newBlog.title}' by '${newBlog.author}' successfully created`,
        state: 'success',
      })
      setTimeout(() => {
        setNotification({
          message: null,
          state: null,
        })
      }, 5000)
    } catch (exception) {
      console.error(exception)
      setNotification({
        message: 'Blog could not be created.',
        state: 'failed',
      })
      setTimeout(() => {
        setNotification({
          message: null,
          state: null,
        })
      }, 5000)
    }
  }

  const updateBlog = async (id, newBlog) => {
    try {
      const updatedBlog = blogService.updateBlog(id, newBlog)
      const newBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      )
      setBlogs(newBlogs)
    } catch (exception) {
      console.error('There were an error in updatingBlog.')
      setNotification({
        message: 'We could not update the blog.',
        state: 'failed',
      })
    }
  }

  const removeBlog = async (id, sendedToken) => {
    try {
      const token = blogService.setToken(sendedToken)
      await blogService.removeBlog(id, token)
      const newBlogs = blogs.filter((b) => {
        return b.id !== id
      })
      setBlogs(newBlogs)
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <div>
          <LoginForm newLoggin={newLoggin} />
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
          <Blogs
            blogs={blogs}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        </div>
      )}
    </div>
  )
}

export default App
