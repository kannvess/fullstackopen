import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('insert blog title here')
  const inputAuthor = screen.getByPlaceholderText('insert blog author here')
  const inputUrl = screen.getByPlaceholderText('insert blog url here')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'Testing')
  await user.type(inputAuthor, 'Testing')
  await user.type(inputUrl, 'Testing')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing')
  expect(createBlog.mock.calls[0][0].author).toBe('Testing')
  expect(createBlog.mock.calls[0][0].url).toBe('Testing')
})