import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { deleteBlog, upToDateBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const loggedUser = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUser)

  const handleElimination = () => {
    if (window.confirm(`Remove blog: ${blog.title} by '${blog.author}'`)) {
      dispatch(deleteBlog(blog.id, user.token))
    }
  }

  const eliminationButton = () => {
    if (user.username === blog.user.username) {
      return <button onClick={handleElimination}>Remove blog</button>
    }
    return null
  }

  const handleLikes = async () => {
    const newBlog = {
      likes: blog.likes + 1,
    }
    dispatch(upToDateBlogs(blog.id, newBlog))
  }

  const styledBlog = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonStyle = {
    margin: 4,
  }

  const button = () => {
    return (
      <button
        id="button-ShowHide"
        onClick={() => setShow(!show)}
        style={buttonStyle}
      >
        {show ? 'Hide' : 'Show'}
      </button>
    )
  }

  const blogToShow = show ? (
    <p style={{ margin: 4 }}>
      <span>TITLE: {blog.title} </span> {button()} <br />
      <span>URL: {blog.url} </span> <br />
      <span>
        LIKES: <b>{blog.likes}</b>{' '}
      </span>
      <button id="button-like" onClick={handleLikes}>
        Like
      </button>
      <br />
      <span>AUTHOR: {blog.author} </span> <br />
      {eliminationButton()}
    </p>
  ) : (
    <p style={{ margin: 4 }}>
      &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
      {button()}
    </p>
  )

  return (
    <div style={styledBlog} className="blogInfo">
      {blogToShow}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
