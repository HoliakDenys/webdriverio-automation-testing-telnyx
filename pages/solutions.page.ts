import BasePage from "./base.page";
import { endpoints } from "../fixtures/endpoints";

export default class SolutionsPage extends BasePage {
    constructor() {
        super(endpoints.solutions);
    }

    public get searchField(): ReturnType<WebdriverIO.Browser["$"]> {
        return $('input#search');
    }

    public get noResultsMessage(): ReturnType<WebdriverIO.Browser["$"]> {
        return $('p*=No results for this filter');
    }

    private get AllArticlesTitles() {
        return $$('li h3');
    }

    public async enterSearchField(searchQuery: string): Promise<void> {
        await this.searchField.setValue(searchQuery);
        await browser.keys('Enter');
    
        await browser.waitUntil(async () => {
            const titles = await this.AllArticlesTitles;
            return await titles.length > 0;
        }, { timeout: 5000 });
    }

    public async validateArticlesContainSearchText(searchQueryText: string): Promise<void> {
        await browser.waitUntil(async () => {
            const titles = await this.AllArticlesTitles;
            return await titles.length > 0;
        }, { timeout: 5000 });
    
        const titles = await this.AllArticlesTitles;
    
        for (const title of titles) {
            const text = await title.getText();
            await expect(text.toLowerCase()).toContain(searchQueryText.toLowerCase());
        }
    }    
    
    public async validateNoResultsMessage(): Promise<void> {
        await this.noResultsMessage.waitForDisplayed({ timeout: 5000 });
        await expect(this.noResultsMessage).toBeDisplayed();
    }
}