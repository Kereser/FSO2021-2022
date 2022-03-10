import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link, useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { id } = useParams()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!id) {
    return (
      <TableContainer>
        <Table size='small' sx={{ maxWidth: 550 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => {
              return (
                <TableRow key={u.id} hover={true}>
                  <TableCell variant='body'>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </TableCell>
                  <TableCell>{u.blogs.length}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  if (users.length === 0) {
    return null
  }

  const userBlogs = users.find((u) => u.id === id)

  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>{userBlogs.name}</h2>
      <p>Added Blogs</p>
      <ul>
        {userBlogs.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
