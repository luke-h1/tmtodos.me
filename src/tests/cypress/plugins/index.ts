/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-param-reassign */
/// <reference types="cypress" />
// eslint-disable-next-line import/no-import-module-exports
import * as dotenv from 'dotenv';

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line consistent-return
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  switch (config.env.environment) {
    case 'local':
      dotenv.config({ path: '.env.local' });
      break;

    case 'staging':
      dotenv.config({ path: '.env.staging' });
      break;

    default:
      dotenv.config({ path: '.env.local' });
  }
  config.env.API_URL = process.env.API_URL;
  config.env.FRONTEND_URL = process.env.FRONTEND_URL;
  config.env.EMAIL = process.env.EMAIL;
  config.env.PASSWORD = process.env.PASSWORD;

  return config;
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(
        testId: string,
        timeout?: number,
      ): Chainable<JQuery<HTMLElement>>;
      getById(id: string, timeout?: number): Chainable<JQuery<HTMLElement>>;
    }
  }
}
