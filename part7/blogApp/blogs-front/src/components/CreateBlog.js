import PropTypes from 'prop-types'
import React, { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    createBlog(newBlog)
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            id='input-title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id='input-author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id='input-url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='button-createNote' type='Submit'>
          Create
        </button>
      </form>
    </div>
  )
}

CreateBlog.prototype = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateBlog
