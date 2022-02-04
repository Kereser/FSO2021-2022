import axios from "axios";

const URL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(URL)
  return request.then(res => res.data)
}

const create = newPerson => {
  const request = axios.post(URL, newPerson)
  return request.then(res => res.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${URL}/${id}`, newPerson)
  return request.then(res => res.data)
}

const erase = id => {
  return axios.delete(`${URL}/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, erase }