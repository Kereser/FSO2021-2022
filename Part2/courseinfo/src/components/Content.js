import React from "react";
import Parts from "./Parts";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Parts
          key={part.id}
          name={part.name}
          exc={part.exercises}
        />
      )}
    </div>
  )
}

export default Content