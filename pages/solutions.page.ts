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
    }    

    public async validateArticlesContainSearchText(searchQueryText: string): Promise<void> {
        await browser.waitUntil(async () => {
            const titles = await this.AllArticlesTitles;
            const firstText = await titles[0].getText();
            return firstText.toLowerCase().includes(searchQueryText.toLowerCase());

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

    public async clickLearnMoreLinkByText(linkText: string): Promise<void> {
        const link = await $(`//p[text()="${linkText}"]/following-sibling::div//a`);
        await link.waitForClickable({ timeout: 5000 });
        await link.click();
    }
}