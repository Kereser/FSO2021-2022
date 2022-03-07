describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      name: 'rootie',
      password: 'sekret',
    })
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root2',
      name: 'rootie2',
      password: 'sekret2',
    })
    cy.visit('http://localhost:3000')
  })

  it('Log in form is shown', function () {
    cy.get('#input-username')
    cy.get('#input-password')
    cy.contains('Login')
  })

  describe('login', function () {
    it('login success', function () {
      cy.login({ username: 'root', password: 'sekret' })

      cy.contains('rootie logged in').contains('Logout')
    })

    it('login fails', function () {
      cy.get('#input-username').type('rootie')
      cy.get('#input-password').type('sekret')
      cy.contains('Login').click()

      cy.contains('rootie logged in').should('not.exist')
      cy.get('.failed').contains('Wrong username or password')
      cy.get('.failed').should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('can create a blog', function () {
      cy.contains('New Blogs').click()

      cy.get('#input-title').type('Blog created by cypress')
      cy.get('#input-author').type('mememem')
      cy.get('#input-url').type('http://notToday.com.co')

      cy.get('#button-createNote').click()

      cy.contains('Blog created by cypress')
      cy.contains('Show')
    })

    describe('When there is a existing blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'TestingBlog',
          url: 'http://testingurl.com.co',
          author: 'Meski',
        })
      })

      it('Can press like button and show upgraded result', function () {
        cy.get('#button-ShowHide').click()
        cy.contains('LIKES: 0')

        cy.get('#button-like').click()
        cy.contains('LIKES: 1')
      })

      it('owner can delete the Blog', function () {
        cy.get('#button-ShowHide').click()
        cy.contains('Remove blog').click()

        cy.get('html').should('not.contain', 'TestingBlog')
      })

      describe('When loggin with other user', function () {
        beforeEach(function () {
          cy.contains('Logout').click()
          cy.login({
            username: 'root2',
            password: 'sekret2',
          })
        })

        it('Can not delete a note', function () {
          cy.contains('TestingBlog')
          cy.contains('Meski')

          cy.get('#button-ShowHide').click()
          cy.contains('LIKES').should('not.contain', 'Remove Blog')

          cy.get('html').should('not.contain', 'Remove Blog')
        })
      })
    })

    describe('When there are a few blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog1',
          url: 'http://testingurl.com.co',
          author: 'Meski',
          likes: 23,
        })
        cy.createBlog({
          title: 'Blog2',
          url: 'http://testingurl.com.co',
          author: 'Meski',
          likes: 800,
        })
        cy.createBlog({
          title: 'Blog3',
          url: 'http://testingurl.com.co',
          author: 'Meski',
          likes: 120,
        })
        cy.createBlog({
          title: 'Blog4',
          url: 'http://testingurl.com.co',
          author: 'Meski',
          likes: 265,
        })
      })

      it('Blogs are sorted by number of likes', function () {
        cy.get('#blogs-container')
          .find('p')
          .each(($p) => {
            cy.wrap($p).contains('Show').click()
          })
          .get('b')
          .each(($b, index) => {
            const likes = [800, 265, 120, 23]
            expect($b.text() === likes[index].toString()).to.be.true
          })
      })
    })
  })
})
