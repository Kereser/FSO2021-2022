import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link, useParams } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { id } = useParams()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!id) {
    return (
      <div>
        <h2 style={{ marginBottom: 0 }}>Users</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <b>blogs created</b>
              </td>
            </tr>
            {users.map((u) => {
              return (
                <tr key={u.id}>
                  <td>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </td>
                  <td>{u.blogs.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  const userBlogs = users.find((u) => u.id === id)

  console.log(userBlogs)
  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>{userBlogs.name}</h2>
      <p>Added Blogs</p>
      <ul>
        {userBlogs.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
