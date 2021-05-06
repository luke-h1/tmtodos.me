describe('sign up', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('div[id="__next"]').should('exist');
  });

  const randId = Math.random();

  it('registers a user succesfully & logs them in', () => {
    cy.register(
      `tester-${Cypress._.random(0, 1e6)}@gmail.com`,
      `pass-${randId}`
    );
    cy.getCookie('fid').should('have.property', 'name', 'fid');
    cy.url().should('include', '/');
  });

  it('allows a succesfully registered user to create a todo', () => {
    cy.register(
      `tester-${Cypress._.random(0, 1e6)}@gmail.com`,
      `pass-${randId}`
    );
    cy.getCookie('fid').should('have.property', 'name', 'fid');
    cy.url().should('include', '/');
    cy.createTodo('I am registered', 'The body of the todo');
  });

  it('fails to register a user with a short password', () => {
    cy.register(`tester-${Cypress._.random(0, 1e6)}@gmail.com`, '1');
    cy.get('[data-testid=auth-error]').contains(
      'password must be greater than 2 characters'
    );
  });

  it('fails to register a user with a bad email', () => {
    cy.register(`tester-${Cypress._.random(0, 1e6)}`, '1234567');
    cy.get('[data-testid=auth-error]').contains('invalid email');
  });
});
