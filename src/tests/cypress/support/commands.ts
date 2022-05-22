Cypress.Commands.add('getByTestId', (testId: string, timeout?: number) => {
  return cy.get(`[data-testid="${testId}"]`, { timeout: timeout || 5000 });
});

Cypress.Commands.add('getById', (id: string, timeout?: number) => {
  return cy.get(`[id="${id}"]`, { timeout: timeout || 5000 });
});
