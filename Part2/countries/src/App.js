import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryInfo from './components/CountryInfo';
import Filter from './components/Filter';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(({ data }) => {
        setCountries(data)
        const names = data.map(el => el.name.common)
        console.log(names)
        console.log(data)
      }) 
  }, [])

  const countriesToShow = countries.filter(country => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="App">
      <header className="App-header">
        <Filter filter={filter} setFilter={setFilter}/>
      </header>
        {
          countriesToShow.length > 10 
          ? <p>You have to make your filter more specific</p>
          : countriesToShow.length === 1 
          ? <CountryInfo country={countriesToShow[0]} /> 
          :
          <Countries countries={countriesToShow} />
        }
    </div>
  );
}

export default App;
