import { Page } from "@playwright/test";
import { HomePage } from "./pages/home";

export class PagesManager {
    private static instance: PagesManager | null = null;
    private readonly page: Page;
    private homePage: HomePage;

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

    onHomePage(): HomePage{
        if(!this.homePage)
            this.homePage = new HomePage(this.page);
        return this.homePage;
    }
}