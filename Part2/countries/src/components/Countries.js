import React from "react";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries }) => {

  return (
    <>
      {
        countries.map(country => {
          return (
            <CountryInfo 
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