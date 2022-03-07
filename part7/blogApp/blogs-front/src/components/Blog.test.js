import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'


describe('reviewing blogs', () => {
  let component

  const blogs =
  {
    author: 'supasupa4',
    id: '6208965147d151937cb6b37a',
    likes: 40011,
    title: 'Adding blog to Super5',
    url: 'http://ProfeSuperPerrOn.com.co',
    user: { username: 'Super5', name: 'Supasupa5', id: '620895d747d151937cb6b367' }
  }

  const removeBlogMock = jest.fn()
  const updateBlogMock = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blogs} updateBlog={updateBlogMock} removeBlog={removeBlogMock}/>
    )
  })


  test('Show title and author by default', () => {
    const infoDisplayed = component.container.querySelector('.blogInfo')
    expect(infoDisplayed).toHaveTextContent('supasupa4')
    expect(infoDisplayed).toHaveTextContent('Adding blog to Super5')
  })

  test('Not show either url nor likes', () => {
    const infoDisplayed = component.container.querySelector('.blogInfo')
    expect(infoDisplayed).not.toHaveTextContent('http://ProfeSuperPerrOn.com.co')
    expect(infoDisplayed).not.toHaveTextContent(40011)
  })
})


describe('reviewing blogs with functions', () => {
  let component

  const blog =
  {
    author: 'supasupa4',
    id: '6208965147d151937cb6b37a',
    likes: 40011,
    title: 'Adding blog to Super5',
    url: 'http://ProfeSuperPerrOn.com.co',
    user: { username: 'Super5', name: 'Supasupa5', id: '620895d747d151937cb6b367' }
  }

  const removeBlogMock = jest.fn()
  const updateBlogMock = jest.fn()

  beforeEach(() => {
    const user = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…TY4fQ.u4dZNpESD1RrXrnGoWZ6Tp98MPSxkvyhMf2v8nJXjUg', username: 'Super1', name: 'Supasupa1' }
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    component = render(
      <Blog blog={blog} removeBlog={removeBlogMock} updateBlog={updateBlogMock} />
    )
  })

  test('Show url and likes when click in button show', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const infoDisplayed = component.container.querySelector('.blogInfo')
    expect(infoDisplayed).toHaveTextContent('http://ProfeSuperPerrOn.com.co')
    expect(infoDisplayed).toHaveTextContent(40011)
  })

  test('Press two times like button', () => {
    const buttonShow = component.getByText('Show')
    fireEvent.click(buttonShow)

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateBlogMock.mock.calls.length).toBe(2)
  })
})
