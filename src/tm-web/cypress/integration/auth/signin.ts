describe('Sign in authentication works', () => {
  // local auth info
  // bob@bob.com
  // veryGoodPassword123

  before(() => {});

  beforeEach(() => {
    cy.visit('/');
    cy.get('div[id="__next"]').should('exist');
  });

  it('logs a user in succesfully', () => {
    cy.login('bob@bob.com', 'veryGoodPassword123');
    cy.getCookie('fid').should('have.property', 'name', 'fid');
  });

  it('allows a user to created a todo', () => {
    cy.login('bob@bob.com', 'veryGoodPassword123');
    cy.createTodo('title', 'body');
  });

  it('fails to authenticate a user with a bad password', () => {
    cy.login('bob@bob.com', 'bad-password');
    cy.get('[data-testid=auth-error]').contains('Incorrect credentials');
    cy.getCookie('fid').should('be.null');
    cy.url().should('include', '/');
  });
  it('fails to authenticate a user with a bad email', () => {
    cy.login('bob_$5%@bob.com', 'veryGoodPassword123');
    cy.get('[data-testid=auth-error]').contains("That email doesn't exist");
    cy.getCookie('fid').should('be.null');
    cy.url().should('include', '/');
  });
});
