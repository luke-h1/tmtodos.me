import config from '../utils/config';

describe('auth', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.visit(Cypress.env('FRONTEND_URL'));
    console.log(Cypress.env('FRONTEND_URL'));
  });

  it('allows user to create new account', () => {
    cy.get('a').contains('register').click();
    cy.get('input[name="firstName"]').type(config.email);
    cy.get('input[name="lastName"]').type(`test-lastname-${Math.random()}`);
    cy.get('input[name="email"]').type(config.email);
    cy.get('input[name="password"]').type(`test-password-${Math.random()}`);
    cy.get('button').contains('Register').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.contains(config.email).should('be.visible');
  });
});
