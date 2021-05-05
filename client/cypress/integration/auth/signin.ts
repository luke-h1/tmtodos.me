
describe('Sign in authentication works', () => {
  before(() => {
    // local auth info 
    // bob@bob.com
    // veryGoodPassword123 
    cy.visit('/login')

  });

  beforeEach(() => { 
    cy.get('div[id="__next"]').should('exist')
    cy.get('[data-testid=email]').type('bob@bob.com')
    cy.get('[data-testid=password]').type('veryGoodPassword123')
    cy.contains('Sign In').click()
    cy.getCookie('fid').should('have.property', 'name', 'fid')
    cy.wait(2000)

  })


  it('allows a user to created a todo', () => { 
    cy.createTodo('title', 'body')
  }) 
});
