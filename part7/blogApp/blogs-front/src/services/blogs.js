import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const req = await axios.post(baseUrl, newBlog, config)
  return req.data
}

const updateBlog = async (id, newBlog) => {
  const req = await axios.put(`${baseUrl}/${id}`, newBlog)
  return req.data
}

const updateBlogComment = async (id, newComment) => {
  const req = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  return req.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  createBlog,
  updateBlog,
  setToken,
  removeBlog,
  updateBlogComment,
}
