import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
  const blog = {
    title: 'Testing',
    author: 'Testing',
    likes: 0,
    url: 'Testing'
  }

  const { container } = render(<Blog blog={blog} />)
  const detail = container.querySelector('.detail')

  expect(detail).toHaveStyle('display: none')
})