import React from "react";

const Filter = ({ filter, setFilter }) => {

  const handleChangeInput = e => {
    setFilter(e.target.value)
  }

  return (
    <>
      <form>
        <div>
        Enter a Filter: <input
            type='text'
            value={filter}
            onChange={handleChangeInput}
          />
        </div>
      </form>
    </>
  )
}

export default Filter