import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  return(
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

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App