describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
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

      cy.contains('Blog created with cypress')
    })
  })
})