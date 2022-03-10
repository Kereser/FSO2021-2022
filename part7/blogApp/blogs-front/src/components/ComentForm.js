import blogService from '../services/blogs'
import React, { useState } from 'react'

import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const CommentForm = ({ id, handleSub }) => {
  const [input, setInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newComment = {
      comment: input,
    }

    const updatedBlog = await blogService.updateBlogComment(id, newComment)
    handleSub(updatedBlog)
    setInput('')
  }

  return (
    <>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          size='small'
          label='Comments'
          name='Comments'
          id='my-input'
          onChange={({ target }) => setInput(target.value)}
          value={input}
          sx={{ flexGrow: 1 }}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          size='medium'
          endIcon={<SendIcon />}
        >
          Add
        </Button>
      </form>
    </>
  )
}

export default CommentForm
