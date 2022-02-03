import React from "react";

const Button = ({ setShow, show }) => {

  const handleClick = () => {
    setShow(!show)
  }

  const buttonTitle = show ? 'Hide' : 'Show'

  return (
    <div>
      <button onClick={handleClick}>{buttonTitle}</button>
    </div>
  )
}

export default Button