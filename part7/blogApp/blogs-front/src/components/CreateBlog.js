import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

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
      <Typography component='h2' variant='h4' sx={{ marginTop: 2 }}>
        Create new blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            size='small'
            label='Title'
            id='input-title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='Author'
            id='input-author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='Url'
            id='input-url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          color='success'
          variant='contained'
          type='Submit'
          endIcon={<AddCircleOutlineIcon />}
          sx={{ marginBottom: 2 }}
        >
          Create
        </Button>
      </form>
    </div>
  )
}

CreateBlog.prototype = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateBlog
