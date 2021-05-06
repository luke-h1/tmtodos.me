describe('user can perform crud operations on a todo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('div[id="__next"]').should('exist');
  });

  it('allows a user to create a todo', () => {
    cy.login('bob@bob.com', 'veryGoodPassword123');
    cy.createTodo('hello', 'hello');
  });

  it('allows a user to edit a todo', () => {
    cy.login('bob@bob.com', 'veryGoodPassword123');
    cy.editTodo(20, 'update', 'update');
  });
});
