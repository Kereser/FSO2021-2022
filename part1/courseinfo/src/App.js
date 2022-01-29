import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  const [ part1, part2, part3 ] = parts
  console.log(part1);
  return(
    <div>
      <Parts name={part1.name} exc={part1.exercises}/>
      <Parts name={part2.name} exc={part2.exercises}/>
      <Parts name={part3.name} exc={part3.exercises}/>
    </div>
  )
}

const Parts = ({ name, exc }) => {
  return (
    <p>{name} {exc}</p>
  )
}

const Total = ({ parts }) => {
  const [ part1, part2, part3 ] = parts
  return (
    <p>Number of exercises: {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App