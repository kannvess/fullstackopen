import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  beforeEach(() => {
    const blog = {
      title: 'Testing',
      author: 'Testing',
      likes: 0,
      url: 'Testing'
    }

    container = render(<Blog blog={blog} />).container
  })

  test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
    const detail = container.querySelector('.detail')

    expect(detail).toHaveStyle('display: none')
  })

  test('blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const detailButton = screen.getByText('show detail')
    await user.click(detailButton)

    const detail = container.querySelector('.detail')
    expect(detail).not.toHaveStyle('display: none')
  })
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Testing',
    author: 'Testing',
    likes: 0,
    url: 'Testing',
    user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzYzY5NTRmN2E5NzFjNjczOTRjMDE4OCIsImlhdCI6MTY3NDM1MDIyNX0.8noJwqwWq595ORs5aUmxnaECtc9wtsLuXdv3Rgs_Xi4'
  }

  const updateBlog = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} updateBlog={updateBlog} />)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlog.mock.calls).toHaveLength(2)
})