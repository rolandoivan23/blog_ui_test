import { Page } from "@playwright/test";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ContactPage } from "./pages/contact";
import { AboutPage } from "./pages/about";

export class PagesManager {
    
    private static instance: PagesManager | null = null;
    private readonly page: Page;
    private homePage: HomePage;
    private loginPage: LoginPage;
    private contactPage: ContactPage;
    private aboutPage: AboutPage;

    constructor(page: Page){
        this.page = page;
    }

    public static resetInstance(): void {
        PagesManager.instance = null;
    }

    public static getInstance(page: Page): PagesManager {
        if (!PagesManager.instance) {
            PagesManager.instance = new PagesManager(page);
        }
        return PagesManager.instance;
    }

    onLoginPage() {
       if(!this.loginPage)
            this.loginPage = new LoginPage(this.page);
        return this.loginPage;
    }

    onHomePage(): HomePage{
        if(!this.homePage)
            this.homePage = new HomePage(this.page);
        return this.homePage;
    }

    onContactPage(): ContactPage {
        if (!this.contactPage)
            this.contactPage = new ContactPage(this.page);
        return this.contactPage;
    }

    onAboutPage(): AboutPage {
        if (!this.aboutPage)
            this.aboutPage = new AboutPage(this.page);
        return this.aboutPage;
    }
}