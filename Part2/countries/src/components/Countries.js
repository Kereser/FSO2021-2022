import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {

  return (
    <>
      {
        countries.map(country => {
          return (
            <Country
              key={country.name.common} 
              country={country} 
            />
          )
        })
      }
    </>
  )
}

export default Countries