import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('Calling createBlog', () => {
  const createBlogMock = jest.fn()

  const component = render(<CreateBlog createBlog={createBlogMock} />)

  const inputTitle = component.container.querySelector('#input-title')
  const inputAuthor = component.container.querySelector('#input-author')
  const inputUrl = component.container.querySelector('#input-url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Creating a note with fireEvent' },
  })

  fireEvent.change(inputAuthor, {
    target: { value: 'fireEvent' },
  })

  fireEvent.change(inputUrl, {
    target: { value: 'https://SoylaURL.com.co' },
  })

  fireEvent.submit(form)

  expect(createBlogMock.mock.calls.length).toBe(1)
  expect(createBlogMock.mock.calls[0][0]).toEqual({
    title: 'Creating a note with fireEvent',
    author: 'fireEvent',
    url: 'https://SoylaURL.com.co',
  })
})
