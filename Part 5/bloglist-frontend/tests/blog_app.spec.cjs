const { test, describe, expect, beforeEach  } = require('@playwright/test')

describe('Blog app', () => {

  describe('When not logged in', () => {
    test('Login form is shown', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    })
  
    test('Login test succeeds', async ({ page }) => {
      await page.goto('/')
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('admin logged in')).toBeVisible()
    })

    test('Login test fails', async ({ page }) => {
      await page.goto('/')
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('password')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong Username/Password')).toBeVisible()
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page,request }) => {
      await request.get('/api/testing/reset')
      await page.goto('/')
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin')
      await page.getByRole('button', { name: 'login' }).click().waitForResponse
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByTestId('inputtitle').fill('sample title')
      await page.getByTestId('inputauthor').fill('sample author')
      await page.getByTestId('inputurl').fill('google.com')
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText('A new blog sample title by sample author added')).toBeVisible()
    })
  
    test('blogs are arranged by decreasing order of likes', async ({ page }) => {
      await page.waitForSelector('.blog');
      const blogs = page.locator('.blog');
      const count = await blogs.count();
      const currentLikes = [];
    
      for (let i = 0; i < count; i++) {
        const blog = blogs.nth(i);
        await blog.getByRole('button', { name: 'View' }).click();
    
        const likesLocator = blog.getByText(/likes/i);
        const likesText = await likesLocator.textContent();
        const likes = parseInt(likesText?.match(/\d+/)?.[0] || '0');
    
        currentLikes.push(likes);
      }
      console.log(currentLikes)
      const isSorted = await currentLikes.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
    
      expect(isSorted).toBe(true);
    });

    test('a blog can be liked', async ({ page }) => {
      const blog = page.getByTestId('React');
      await blog.getByRole('button', { name: 'view' }).click();
      const likesLocator = blog.getByText(/likes/i);
      const likesText = await likesLocator.textContent();
      const currentLikes = parseInt(likesText.match(/\d+/)[0]);
      await Promise.all([
        page.waitForResponse(response =>
          response.url().includes('/api/blogs/') &&
          response.request().method() === 'PUT' &&
          response.status() === 200
        ),
        blog.getByRole('button', { name: 'like' }).click()
      ]);
      const updatedLikesText = await likesLocator.textContent();
      const updatedLikes = parseInt(updatedLikesText.match(/\d+/)[0]);
      await expect(updatedLikes).toBe(currentLikes + 1);
    })

    test('a new blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByTestId('inputtitle').fill('sample title')
      await page.getByTestId('inputauthor').fill('sample author')
      await page.getByTestId('inputurl').fill('google.com')
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText('A new blog sample title by sample author added')).toBeVisible()

      const blog = page.getByTestId('sample title');
      await blog.getByRole('button', { name: 'view' }).click();

      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete this blog?');
        await dialog.accept();
      });

      await Promise.all([
        page.waitForResponse(response =>
          response.url().includes('/api/blogs/') &&
          response.request().method() === 'DELETE' &&
          response.status() === 204
        ),
        blog.getByRole('button', { name: 'Delete' }).click()
    ]);
      await expect(blog).not.toBeVisible();
    })
  })

  describe('When logged in as another user', () => {
    beforeEach(async ({ page,request }) => {
      await request.get('/api/testing/reset')
      await page.goto('/')
      await page.getByTestId('username').fill('home')
      await page.getByTestId('password').fill('home')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog is not shown', async ({ page }) => {
      const blog = page.getByTestId('React');
      await blog.getByRole('button', { name: 'view' }).click();

      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure you want to delete this blog?');
        await dialog.accept();
      });

      await Promise.all([
        page.waitForResponse(response =>
          response.url().includes('/api/blogs/') &&
          response.request().method() === 'DELETE' &&
          response.status() === 401
        ),
        blog.getByRole('button', { name: 'Delete' }).click()
    ]);
      await expect(blog).toBeVisible();
    })
  })
})