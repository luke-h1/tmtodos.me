describe('unauthenticated users cannot access protected routes', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('div[id="__next"]').should('exist');
  });

  it("doesn't allow user to access create-todo", () => {
    cy.visit('/create-todo');
    cy.url().should('include', 'http://localhost:3000/login?next=/create-todo');
  });
  it("doesn't allow a user to access todo/[id]", () => {
    cy.visit('/todo/1');
    cy.contains('Could not find todo').should('exist');
  });

  it("doesn't allow a user to edit a todo", () => {
    cy.visit('/todo/edit/1');
    cy.contains('Could not find todo').should('exist');
  });
});
