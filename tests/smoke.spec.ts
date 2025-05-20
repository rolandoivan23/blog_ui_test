import { test, expect } from '@playwright/test';
import { PagesManager } from '../pom/PagesManager';

test('Login Test', async ({page}) => {
  await page.goto('http://localhost:3000/');
  const loginPage = PagesManager.getInstance(page).onLoginPage();

  await loginPage.login('rolando.vazquez@hey.com', '123pum');
  await loginPage.logout(); 
  /*await loginPage.login('rolando.vazquez@hey.com', '123pum');
  //await loginPage.logout(false);
  await loginPage.logout();*/
  await loginPage.validateWrongData();
});


test('Blog Menu', async ({page}) => {
  await page.goto('https://blog.mexclouds.com/');
  const homePage = PagesManager.getInstance(page).onHomePage();

  const headerTitle = page.locator('header h1');
  await expect(headerTitle).toBeVisible();

  const menuItems = {
    'People': 'Joined',
    'Categories': 'Explore Categories',
    'About': 'Contact Info',
    'Contact': 'Send a Message',
    'Home': 'Post Comment',
  };


  for(let item in menuItems){
    homePage.navigateTo(item);
    //This timeout is mainly for dev env due to performace issues(related to n+1 queries)
    await expect(page.getByText(menuItems[item]).first()).toBeVisible({timeout: 10000});
  }
});