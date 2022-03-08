import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, updateBlog, removeBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })
  return (
    <div id="blogs-container">
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
