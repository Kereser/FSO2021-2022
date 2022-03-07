import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = userToken => {
  token = `bearer ${userToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const updateBlog = async (id, newBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, newBlog)
  return request.data
}

const removeBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}


export default { getAll, createBlog, updateBlog, setToken, removeBlog }