import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const Notification = ({ notification }) => {
  const { message, state } = notification
  if (!message) {
    return null
  } else {
    if (!state) return null

    if (state === 'failed') {
      return (
        <Alert severity='error'>
          <AlertTitle>Authentication Error</AlertTitle>
          {message}
        </Alert>
      )
    } else {
      return <Alert severity='success'>{message}</Alert>
    }
  }
}

export default Notification
