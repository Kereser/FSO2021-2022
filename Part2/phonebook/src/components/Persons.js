import React from "react";
import Person from "./Person"

const Persons = ({ persons }) => {

  return (
    <ul>
      {
        persons.map(pers => {
          return <Person
            key={pers.id}
            name={pers.name}
            number={pers.number}
          />
        })
      }
    </ul>
  )

}

export default Persons