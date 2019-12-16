import { ClientFunction, Selector } from 'testcafe';

export const login = async ({ email, password, browser }) => {
  await browser.typeText('[data-test="emailAdress"]', email);
  await browser.typeText('[data-test="password"]', password);
  await browser.click('[data-test="loginBtn"]');
  // await Selector('')();
};

export const getPageUrl = ClientFunction(() => window.location.href);