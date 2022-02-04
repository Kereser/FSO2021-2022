import React from "react";
import Person from "./Person"

const Persons = ({ persons, handleDelete }) => {

  return (
    <>
      {
        persons.map(pers => {
          return <Person
            key={pers.id}
            name={pers.name}
            number={pers.number}
            handleDelete={() => handleDelete(pers.id, pers.name)}
          />
        })
      }
    </>
  )

}

export default Persons