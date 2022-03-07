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
      toggleVisible
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>New Blogs</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable