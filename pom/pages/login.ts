import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class LoginPage extends BasePage {
    constructor(page: Page){
        super(page);
    }

    async login(username: string, password: string) {
        await this.page.getByRole("link", { name: "Login" }).click();
        await this.submitLoginForm(username, password);

        await expect(this.page.locator('.left-sidebar > .user-profile')).toBeVisible()
    }

    async logout(acceptDialog: boolean = true) {
       await this.page.locator('.sign-out-icon-button').click();
        await expect(this.page.getByRole("link", { name: "Login" })).toBeVisible();
       /*
       if(acceptDialog){
           await this.confirmDialog();
           await expect(this.page.getByRole("link", { name: "Login" })).toBeVisible();
       }else{
           await this.confirmDialog(false);
           await expect(this.page.getByRole("link", { name: "Login" })).not.toBeVisible();
       }*/
    }

    async confirmDialog(acceptDialog: boolean = true) {
        this.page.once('dialog', async (dialog) => {
            if(acceptDialog) {
                await dialog.accept();
            }else{
                await dialog.dismiss();
            }
        });
    }

    async validateWrongData() {
        await this.page.getByRole("link", { name: "Login" }).click();
        await this.submitLoginForm('rolando.vazquez@hey.com', 'wrongpassword');

        await expect(this.page.locator('[style="color:red"]')).toBeVisible();

        await this.page.reload();

        await this.submitLoginForm('rolando.vazquezrolando.vazquezrolando.vazquez@hrolando.vazquezrolando.vazquezey.com', 'wrongpassword');

        await expect(this.page.locator('[style="color:red"]')).toBeVisible();

        await this.page.reload();

        await this.submitLoginForm('', '');

        await this.submitLoginForm(' ', ' ');

        await this.submitLoginForm('rolando.vazquez@hey.com', '');

        await this.submitLoginForm('rolando.vazquez@hey.com', ' ');

        await expect(this.page.locator('[style="color:red"]')).toBeVisible()
    }

    async fillLoginForm(username: string, password: string) {
        await this.page.locator("#email_address").waitFor({ state: "attached" });
        await this.page.locator("#email_address").fill(username);
        await this.page.locator("#password").fill(password);
    }
    async submitLoginForm(username: string, password: string) {
        await this.fillLoginForm(username, password);
        await this.page.getByRole("button", { name: "Sign in" }).click();
    }

}