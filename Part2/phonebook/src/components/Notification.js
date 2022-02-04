import React from "react";

const Notification = ({ message }) => {
  return (
    <div className={message.class}>
      {message.message}
    </div>
  )
}

export default Notification