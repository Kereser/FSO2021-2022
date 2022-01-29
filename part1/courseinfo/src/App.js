import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ part1, part2, part3, exercises1, exercises2, exercises3, }) => {
  return(
    <div>
      <Parts name={part1} exc={exercises1}/>
      <Parts name={part2} exc={exercises2}/>
      <Parts name={part3} exc={exercises3}/>
    </div>
  )
}

const Parts = ({ name, exc }) => {
  return (
    <p>{name} {exc}</p>
  )
}

const Total = ({ total }) => {
  return (
    <p>Number of exercises: {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name} 
        exercises1={part1.exercises}
        part2={part2.name} 
        exercises2={part2.exercises}
        part3={part3.name} 
        exercises3={part3.exercises}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App