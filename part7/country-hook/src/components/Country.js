const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }
  const [ countryToShow ] = country
  return (
    <div>
      <h3>{countryToShow.name.common}</h3>
      <div>population {countryToShow.population}</div>
      <div>capital {countryToShow.capital}</div>
      <img src={countryToShow.flags.png} height='100' alt={`flag of ${countryToShow.name.common}`} />
    </div>
  )
}

export default Country