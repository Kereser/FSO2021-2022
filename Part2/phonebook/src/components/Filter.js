import React from "react"

const Filter = ({ func, filter }) => {
  return (
    <div>
      Filter: <input
        type='text'
        value={filter}
        onChange={func}
      />
    </div>
  )
}


export default Filter