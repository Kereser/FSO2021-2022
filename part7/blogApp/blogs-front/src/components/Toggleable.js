import { Button } from '@mui/material'

import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setVisible(true)}
        >
          New Blogs
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant='contained'
          color='error'
          onClick={() => setVisible(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable
