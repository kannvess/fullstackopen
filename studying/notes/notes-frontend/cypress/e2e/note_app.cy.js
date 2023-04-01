describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('123')
    cy.get('#login-button').click()

    cy.contains('Superuser logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wtf')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html')
      .should('not.contain', 'Superuser logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.contains('login').click()
      // cy.get('#username').type('root')
      // cy.get('#password').type('123')
      // cy.get('#login-button').click()

      // cy.contains('Superuser logged in')

      // cy.request('POST', 'http://localhost:3001/api/login', {
      //   username: 'root', password: '123'
      // }).then(response => {
      //   localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      //   cy.visit('localhost:3000')
      // })

      cy.login({ username: 'root', password: '123' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it.only('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })

    })
  })
})