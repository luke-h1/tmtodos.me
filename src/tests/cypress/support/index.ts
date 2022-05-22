import './commands';

Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test on uncaught exceptions
  return false;
});
