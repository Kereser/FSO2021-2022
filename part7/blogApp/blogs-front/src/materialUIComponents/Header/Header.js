import React from 'react'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

export const Header = ({ login, handleLogOut }) => {
  return (
    <AppBar>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color='inherit' href='/'>
            Blogs
          </Button>
          <Button color='inherit' href='/users'>
            Users
          </Button>
        </Box>
        <Typography>
          {login.name} logged in{' '}
          <Button onClick={handleLogOut} color='inherit'>
            Logout
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
