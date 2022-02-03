import React from "react";

const Countries = ({ countries }) => {
  return (
    <ul>
      {
        countries.map(country => {
          return <li key={country.name.common}>{country.name.common}</li>
        })
      }
    </ul>
  )
}

export default Countries