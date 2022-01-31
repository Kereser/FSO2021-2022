import React from "react";

const Total = ({ parts }) => {
  return (
    <p>Course with: {parts.reduce((acc, cur) => {
      return {
        ...acc,
        exercises: acc.exercises + cur.exercises
      }
    }).exercises} exercises
    </p>
  )
}

export default Total