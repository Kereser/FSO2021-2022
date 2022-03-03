import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event = null) => {
    event === null 
    ? setValue('')
    : setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    async function fetchingData() {
      const req = await axios.get(baseUrl)
      setResources(req.data)
    } 
    fetchingData()
  }, [baseUrl])

  const create = async (resource) => {
    const req = await axios.post(baseUrl, resource)
    return req.data
  }

  const service = {
    create, setResources
  }

  return [
    resources, service
  ]
}