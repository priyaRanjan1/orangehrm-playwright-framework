import { Locator, Page, expect } from '@playwright/test';
export class LoginPage {
   page: Page;
   usernameInput: Locator
   passwordInput: Locator
   loginButton: Locator
   adminLink: Locator
   brandBanner: Locator

   constructor(page:Page){
    this.page=page
    this.usernameInput=this.page.getByRole('textbox', { name: 'Username' })
    this.passwordInput=this.page.getByRole('textbox', { name: 'Password' })
    this.loginButton=this.page.getByRole('button', { name: 'Login' })
    this.adminLink=this.page.getByRole('link', { name: 'Admin' })
    this.brandBanner=this.page.getByRole('link', { name: 'client brand banner' })
   }

    async navigateTo(url: string="web/index.php/auth/login") {
    await this.page.goto(url);
    }

    async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // 1. Assertions 
    await expect(this.adminLink).toBeVisible();
    await expect(this.brandBanner).toBeVisible()
    // 3. Take screenshots 
    await this.page.screenshot({ path: 'screenshot/succesfulloginimage.png', fullPage: true });
    await this.page.screenshot({ path: 'screenshot/fullpage.png', fullPage: true });
    }

}