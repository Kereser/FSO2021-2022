import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link, useParams } from 'react-router-dom'

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
        <Table size='medium' sx={{ maxWidth: 550 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontSize: 22 }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => {
              return (
                <TableRow key={u.id} hover={true}>
                  <TableCell variant='body' sx={{ fontSize: 17 }}>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </TableCell>
                  <TableCell variant='body' sx={{ fontSize: 17 }}>
                    {u.blogs.length}
                  </TableCell>
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
      <Typography component='h2' variant='h3'>
        {userBlogs.name}
      </Typography>
      <Typography
        component='h4'
        variant='h5'
        sx={{ marginTop: 2, paddingLeft: 1 }}
      >
        Added Blogs
      </Typography>
      <List>
        {userBlogs.blogs.map((b) => (
          <React.Fragment key={b.id}>
            <ListItem>
              <ListItemText>{b.title}</ListItemText>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default Users
