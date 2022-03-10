import blogService from '../services/blogs'
import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={({ target }) => setInput(target.value)}
        value={input}
      />
      <button type='submit'>Add comment</button>
    </form>
  )
}

export default CommentForm
