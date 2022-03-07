import React from 'react'

const Notification = ({ notification }) => {

  const { message, state } = notification

  if (message === null) {
    return null
  }
  else {
    return (
      <div className={state}>
        {message}
      </div>
    )
  }

}

export default Notification