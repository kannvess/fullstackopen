describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const users = [
      {
        name: 'Superuser',
        username: 'root',
        password: '123'
      },
      {
        name: 'Rafli Afriansyah',
        username: 'rafli',
        password: '123'
      }
    ]
    users.map(user => {
      cy.request('POST', 'http://localhost:3003/api/users', user)
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('123')
      cy.contains('login').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.should('not.contain', 'blogs')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('123')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Blog created with cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog_app.cy.js')

      cy.get('#submit-button').click()

      cy.get('#blog-list')
        .should('contain', 'Blog created with cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Blog created with cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog_app.cy.js')

      cy.get('#submit-button').click()

      cy.get('#blog-list')
        .should('contain', 'Blog created with cypress')
        .contains('view').click()
      cy.contains('show detail').click()
      cy.contains('like').click()
    })

    it('A user can delete their blog', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Blog created with cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog_app.cy.js')

      cy.get('#submit-button').click()

      cy.get('#blog-list')
        .should('contain', 'Blog created with cypress')

      cy.get('#blog-list')
        .should('contain', 'Blog created with cypress')
        .contains('view').click()
      cy.contains('remove').click()

      cy.get('#blog-list')
        .should('not.contain', 'Blog created with cypress')
    })

    it('A user cannot delete a blog they did not create', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Blog created with cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog_app.cy.js')

      cy.get('#submit-button').click()

      cy.contains('logout').click()

      cy.get('#username').type('rafli')
      cy.get('#password').type('123')
      cy.contains('login').click()

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html')
        .should('contain', 'Blog created with cypress')
    })

    it('Blogs are sorted based on likes descendingly', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog number 1')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog_app.cy.js')
      cy.get('#submit-button').click()

      cy.contains('new blog').click()
      cy.get('#title').type('Blog number 2')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/__/#/specs/runner?file=cypress/e2e/blog_app.cy.js')
      cy.get('#submit-button').click()

      cy.get('.blog').eq(0)
        .should('contain', 'Blog number 1')
        .contains('view').click()
      cy.get('.blog').eq(0)
        .contains('show detail').click()
      cy.get('.blog').eq(0)
        .contains('like').click()

      cy.get('.blog').eq(1)
        .should('contain', 'Blog number 2')
        .contains('view').click()
      cy.get('.blog').eq(1)
        .contains('show detail').click()
      cy.get('.blog').eq(1)
        .contains('like').click().click()

      cy.get('.blog').eq(0)
        .should('contain', 'Blog number 2')
    })
  })
})