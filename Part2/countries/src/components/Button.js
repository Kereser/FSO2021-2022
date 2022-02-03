import React from "react";

const Button = ({ setShow, show }) => {

  const handleClick = () => {
    setShow(!show)
  }

  const buttonTitle = show ? 'Hide' : 'Show'

  return <button onClick={handleClick}>{buttonTitle}</button>
}

export default Button