import { Page } from "@playwright/test";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ContactPage } from "./pages/contact";
import { AboutPage } from "./pages/about";
import { CategoriesPage } from "./pages/categories";
import { BasePage } from "./BasePage";
import { PostsPage } from "./pages/posts";

export class PagesManager {
    
    private static instance: PagesManager | null = null;
    private readonly page: Page;
    private homePage: HomePage;
    private loginPage: LoginPage;
    private contactPage: ContactPage;
    private aboutPage: AboutPage;
    private categoriesPage: CategoriesPage;
    private basePage: BasePage;
    private postsPage: PostsPage;

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

    getBasePage(): BasePage {
        if (!this.basePage)
            this.basePage = new BasePage(this.page);
        return this.basePage;
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

    onCategoriesPage(): CategoriesPage {
        if (!this.categoriesPage)
            this.categoriesPage = new CategoriesPage(this.page);
        return this.categoriesPage;
    }

    onAboutPage(): AboutPage {
        if (!this.aboutPage)
            this.aboutPage = new AboutPage(this.page);
        return this.aboutPage;
    }

    onPostsPage(): PostsPage {
        if (!this.postsPage)
            this.postsPage = new PostsPage(this.page);
        return this.postsPage;
    }

}