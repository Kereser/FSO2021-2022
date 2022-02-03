import React, { useState } from "react";
import Button from "./Button";

const CountryInfo = ({ country, showCountry = false } = {}) => {
  const [show, setShow] = useState(showCountry)

  return (
    <>
      {
        show
          ?
          <>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
              {
                Object.values(country.languages).map(lang => {
                  return <li key={lang}>{lang}</li>
                })
              }
            </ul>
            <img
              alt="Countrie Flag"
              src={country.flags.svg}
              height='120'
              width='120'
            />
            <div>
              <Button show={show} setShow={setShow} />
            </div>
          </>
          :
          <div>
            {country.name.common} <Button show={show} setShow={setShow} />
          </div>
      }
    </>
  )
}

export default CountryInfo