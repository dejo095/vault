import { Selector } from 'testcafe';
import { login, getPageUrl } from './helpers/e2e';

fixture('/dashboard').page('http://localhost:8081/login');

test('Should show dashboard', async (browser) => {

  await login({
    email: 'dejo095@gmail.com',
    password: 'deksart',
    browser,
  });
  // await browser.click('');
  await browser.expect(getPageUrl()).contains('/dashboard');

});