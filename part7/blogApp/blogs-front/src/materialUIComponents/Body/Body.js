import { Paper, Typography } from '@mui/material'

import React, { useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Toggleable from '../../components/Toggleable'
import CreateBlog from '../../components/CreateBlog'
import Users from '../../components/Users'
import Blog from '../../components/Blog'
import { useDispatch } from 'react-redux'

import { addBlog } from '../../reducers/blogReducer'

export default function Body() {
  const dispatch = useDispatch()

  const createBlogRef = useRef()

  const addNewBlog = (newBlog) => {
    createBlogRef.current.toggleVisible()
    dispatch(addBlog(newBlog))
  }

  return (
    <Paper elevation={4} variant='elevation'>
      <Typography component='h1' variant='h2' sx={{ marginTop: 9 }}>
        Blogs Application
      </Typography>
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route
          path='/'
          element={
            <>
              <Toggleable ref={createBlogRef}>
                <CreateBlog createBlog={addNewBlog} />
              </Toggleable>
              <Blog />
            </>
          }
        />
        <Route path='/users/:id' element={<Users id={true} />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </Paper>
  )
}
