// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add('createTodo', (title, body) => { 
    cy.viewport(1920, 1080)
    cy.visit('/create-todo')
    cy.get('[data-testid=title]').type(title) 
    cy.get('[data-testid=body]').type(body)
    cy.contains('Create Todo').click()
    cy.url().should('contain', '/')
    cy.contains(title).should('exist')
    cy.contains(body).should('exist')
    
})


Cypress.Commands.add('login', (email, password) => { 
    cy.visit('/login')
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=password]').type(password)
    cy.contains('Sign In').click()

})

Cypress.Commands.add('register', (email, password) => { 
    cy.visit('/register')
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=password]').type(password)
    cy.contains('Sign Up').click()

})

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
