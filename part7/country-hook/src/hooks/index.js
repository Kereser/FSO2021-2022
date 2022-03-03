import axios from "axios"
import { useEffect, useState } from "react"


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchDataCountry = async () => {
      if (name === '') {
        return country
      }
      else { 
        try {
          const req = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
          setCountry(req.data)
          return country
        } catch (exception) {
          setCountry(null)
          return country
        }
      }
    }
    fetchDataCountry()
  }, [name, country])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}