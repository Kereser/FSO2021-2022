import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notifications'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNot } from './reducers/notificationReducer'
import { addBlog, initializeBlogs, upToDateBlogs } from './reducers/blogReducer'
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

  const newLoggin = async (newUser) => {
    try {
      const user = await loginService.login(newUser)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNot('Wrong username or password', 'failed'))
      setTimeout(() => {
        dispatch(setNot(null, null))
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const createBlogRef = useRef()

  const addNewBlog = async (newBlog) => {
    try {
      createBlogRef.current.toggleVisible()
      const createdBlog = await blogService.createBlog(newBlog)
      dispatch(addBlog(createdBlog))
      dispatch(
        setNot(
          `Blog '${newBlog.title}' by '${newBlog.author}' successfully created`,
          'success',
        ),
      )
      setTimeout(() => {
        dispatch(setNot(null, null))
      }, 5000)
    } catch (exception) {
      console.error(exception)
      dispatch(setNot('Blog could not be created.', 'failed'))
      setTimeout(() => {
        dispatch(setNot(null, null))
      }, 5000)
    }
  }

  const updateBlog = (id, newBlog) => {
    try {
      dispatch(upToDateBlogs(id, newBlog))
    } catch (exception) {
      console.error('There were an error in updatingBlog.')
      dispatch(setNot('We could not update the blog.', 'failed'))
    }
  }

  const removeBlog = async (id, sendedToken) => {
    try {
      const token = blogService.setToken(sendedToken)
      await blogService.removeBlog(id, token)
      const newBlogs = blogs.filter((b) => {
        return b.id !== id
      })
      dispatch(initializeBlogs(newBlogs))
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
