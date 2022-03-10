import * as React from 'react'
import CommentForm from './ComentForm'

import { upToDateBlogs, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  const loggedUser = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUser)

  const handleElimination = (blog) => {
    if (window.confirm(`Remove blog: ${blog.title} by '${blog.author}'`)) {
      dispatch(deleteBlog(blog.id, user.token))
    }
  }

  const eliminationButton = (blog) => {
    if (user.username === blog.user.username) {
      return (
        <button onClick={() => handleElimination(blog)}>Remove blog</button>
      )
    }
    return null
  }

  const handleLikes = (blog) => {
    return () => {
      const newBlog = {
        likes: blog.likes + 1,
      }
      dispatch(upToDateBlogs(blog.id, newBlog))
    }
  }

  const styledBlog = {
    paddingLeft: 2,
    paddingTop: 3,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 0,
    marginTop: 4,
  }

  const pStyling = {
    marginTop: 0,
    marginBottom: 0,
  }

  if (!id) {
    return (
      <div>
        {sortedBlogs.map((b) => {
          return (
            <Link
              component={Link}
              key={b.id}
              style={styledBlog}
              to={`/blogs/${b.id}`}
            >
              {b.title}
            </Link>
          )
        })}
      </div>
    )
  }

  if (blogs.length === 0) return null

  const blogToShow = blogs.find((b) => b.id === id)

  const handleSubmit = (newBlog) => {
    dispatch(updateBlog(newBlog))
  }
  return (
    <div>
      <h2>{blogToShow.title}</h2>
      <p style={pStyling}>
        <a href={blogToShow.url}>{blogToShow.url}</a>
      </p>
      <p style={pStyling}>
        Likes: {blogToShow.likes}{' '}
        <button onClick={handleLikes(blogToShow)}>Vote</button>
      </p>
      <p style={pStyling}>Added by {blogToShow.author}</p>
      {eliminationButton(blogToShow)}
      <h3>Comments</h3>
      <CommentForm id={blogToShow.id} handleSub={handleSubmit} />
      <ul>
        {blogToShow.comments.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default Blog
