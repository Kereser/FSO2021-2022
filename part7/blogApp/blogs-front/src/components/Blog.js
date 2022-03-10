import * as React from 'react'
import CommentForm from './ComentForm'

import { upToDateBlogs, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import RemoveButton from '../materialUIComponents/Tooltip/RemoveButton'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

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
      return <RemoveButton onClick={() => handleElimination(blog)} />
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

  if (!id) {
    return (
      <List>
        {sortedBlogs.map((b) => {
          return (
            <React.Fragment key={b.id}>
              <ListItem button component={Link} to={`/blogs/${b.id}`}>
                <ListItemText key={b.id}>{b.title}</ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })}
      </List>
    )
  }

  if (blogs.length === 0) return null

  const blogToShow = blogs.find((b) => b.id === id)

  const handleSubmit = (newBlog) => {
    dispatch(updateBlog(newBlog))
  }
  return (
    <div>
      <List>
        <h2>{blogToShow.title}</h2>
        <ListItem button component='a' href={blogToShow.url}>
          <ListItemText primary={blogToShow.url} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={`Likes: ${blogToShow.likes}`} />
          <IconButton onClick={handleLikes(blogToShow)}>
            <ThumbUpIcon />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={`Added by ${blogToShow.author}`} />
        </ListItem>
        <Divider />
        <ListItem>{eliminationButton(blogToShow)}</ListItem>
      </List>
      <CommentForm id={blogToShow.id} handleSub={handleSubmit} />
      <List>
        {blogToShow.comments.map((comment, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText>{comment}</ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })}
      </List>
    </div>
  )
}

export default Blog
