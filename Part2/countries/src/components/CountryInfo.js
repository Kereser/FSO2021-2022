import React, { useState, useEffect } from "react";
import axios from "axios";


const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({})

  const URL = 'http://api.weatherstack.com/current'
  const API_KEY = process.env.REACT_APP_API_KEY
  const countryName = country.name.common

  useEffect(() => {
    console.log('Se realizo llamada a la API del clima');
    axios
      .get(`${URL}?access_key=${API_KEY}&query=${country.capital[0]}`)
      .then(({ data }) => {
        setWeather(data)
      })
  }, [API_KEY, country.capital])


  return (
    <>
      <h1>{countryName}</h1>
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
      {
        Object.keys(weather).length === 0
          ? null
          :
          <div>
            <h3>Weather in {countryName}</h3>
            <h4>Temperature: {weather.current.temperature}</h4>
            <img
              alt="Weather Icon"
              src={weather.current.weather_icons[0]}
            />
            <h4>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h4>
          </div>
      }
    </>
  )
}

export default CountryInfo
