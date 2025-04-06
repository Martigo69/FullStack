import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog';

test('Test 1', () => {
    const blog = {
        title: "sample title",
        author: "sample author",
        url: "sample url"
    }
    const myRef = { current: null };

  const { container } = render(<Blog blog={blog} blogs={[]} setBlogs={vi.fn()} setErrorMessage={vi.fn()} blogViewRef={myRef} />)

  const authorelement = container.querySelector('.author')
  const titleelement = container.querySelector('.title')
  const urlelement = container.querySelector('.url')
  const likeselement = container.querySelector('.likes')

  expect(titleelement).toHaveTextContent('sample title')
  expect(urlelement).not.toBeVisible()
  expect(likeselement).not.toBeVisible()
  expect(authorelement).toHaveTextContent('sample author')
})

test('Test 2', async() => {
    const blog = {
        title: "sample title",
        author: "sample author",
        likes: 10,
        url: "sample url"
    }
    const myRef = { current: null };

    const { container } = render(<Blog blog={blog} blogs={[]} setBlogs={vi.fn()} setErrorMessage={vi.fn()} blogViewRef={myRef} />)
    
    const user = userEvent.setup()
    const button = container.querySelector('.show')
    await user.click(button)

    const likeselement = container.querySelector('.likes')
    const urlelement = container.querySelector('.url')
    expect(likeselement).toBeVisible()
    expect(urlelement).toBeVisible()
})

test('Test 3', async () => {
    const blog = {
        title: "sample title",
        author: "sample author",
        likes: 10,
        url: "sample url"
    }
    const myRef = { current: null };

    const mockUpdateBlog = vi.fn()

    const { container } = render(<Blog blog={blog} blogs={[]} setBlogs={vi.fn()} setErrorMessage={vi.fn()} blogViewRef={myRef} updateBlogMock={mockUpdateBlog} />)

  const user = userEvent.setup()
  const showbutton = container.querySelector('.show')
  await user.click(showbutton)
  const likesbutton = container.querySelector('.likesbutton')
  await user.click(likesbutton)
  await user.click(likesbutton)
  expect(mockUpdateBlog).toHaveBeenCalledTimes(2);

})

test('Test 4', async() => {
    const blog = {
        title: "sample title",
        author: "sample author",
        likes: 10,
        url: "sample url"
    }
    const mockRef = {
        current: {
          toggleVisibility: vi.fn() 
        }
      }

    const mockCreateBlog = vi.fn()

    const { container } = render(<AddBlog blogs={[]} setBlogs={vi.fn()} setErrorMessage={vi.fn()} blogFormRef={mockRef} mockCreateBlog={mockCreateBlog}/>)

    const user = userEvent.setup()
    const showbutton = container.querySelector('.show')
    await user.click(showbutton)
    const titleinput = container.querySelector('.title')
    const authorinput = container.querySelector('.author')
    const urlinput = container.querySelector('.url')
    await user.type(titleinput, 'sample title')
    await user.type(authorinput, 'sample author')
    await user.type(urlinput, 'sample url')
    const submitbutton = container.querySelector('.submitbutton')
    await user.click(submitbutton)
    expect(mockCreateBlog).toHaveBeenCalledTimes(1);
    const createdBlog = mockCreateBlog.mock.calls[0][0]
    expect(createdBlog.title).toBe('sample title')
    expect(createdBlog.author).toBe('sample author')
    expect(createdBlog.url).toBe('sample url')
})