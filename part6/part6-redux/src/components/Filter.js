import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {

  const handleChange = e => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <div>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

export default connect(null, mapDispatchToProps)(Filter)
