import BasePage from "./base.page";
import { endpoints } from "../fixtures/endpoints";

export default class ResourcesPage extends BasePage {
    constructor() {
        super(endpoints.resources);
    }

    public getNextPageButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $(`a svg[aria-describedby="go-to-next-page"]`);
    }

    public getPrevPageButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $(`a svg[aria-describedby="go-to-previous-page"]`);
    }

    public get SearchField(): ReturnType<WebdriverIO.Browser["$"]> {
        return $('input#search');
    }

    public get cookieBannerCloseButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $('div#onetrust-close-btn-container button');
    }

    public getElementByName(typeOfElement: string, elementName: string): ReturnType<WebdriverIO.Browser["$"]> {
        return $(`${typeOfElement.toLowerCase()}*=${elementName}`);
    }    

    private async verifyElementVisibleByName(typeOfElement: string, elementName: string): Promise<void> {
        const element = await this.getElementByName(typeOfElement, elementName);
        await expect(element).toBeDisplayedInViewport();
    }

    private async closeCookieBannerIfPresent(): Promise<void> {
        const cookieCloseButton = this.cookieBannerCloseButton;
        if (await cookieCloseButton.isDisplayed()) {
            await cookieCloseButton.click();
        }
    }

    public async selectFilter(filterName?: string): Promise<void> {
        await this.closeCookieBannerIfPresent();
    
        if (filterName) {
            const selector = `a[href*="/resources/topic/${filterName.toLowerCase()}"]`;
    
            await browser.waitUntil(async () => {
                const el = await $(selector);
                return await el.isExisting();
            }, { timeout: 2000 });
    
            const filterLink = await $(selector);
            await filterLink.scrollIntoView();
            await filterLink.waitForClickable({ timeout: 2000 });
            await filterLink.click();
        } else {
            const activeDiv = await $('div[data-state="checked"]');
            const filterLink = await activeDiv.parentElement();
            await filterLink.scrollIntoView();
            await filterLink.waitForClickable({ timeout: 2000 });
            await filterLink.click();
        }
    }    

    public async reloadPage(): Promise<void> {
        await browser.refresh();
    }

    public async checkFilterState(expectedState: 'checked' | 'unchecked', filterName: string): Promise<void> {
        const stateSelector = expectedState === 'checked'
            ? `//div[@data-state="checked"]//div[text()="${filterName}"]`
            : `//div[@data-state="unchecked"]//div[text()="${filterName}"]`;
    
        const filter = await $(stateSelector);
        await filter.waitForExist({ timeout: 10000 });
        expect(await filter.isExisting()).toBeTruthy();
    }
            
    
    public async selectArticle(articleName: string, articleType: string = 'li'): Promise<void> {
        await this.getElementByName(articleType, articleName).click();
    }

    public async toggleLink(linkName: string, linkType: string = 'a'): Promise<void> {
        const element = await this.getElementByName(linkType, linkName)
        await element.click();
    }

    public async verifySectionVisible(sectionName: string, typeOfElement: string = 'h2'): Promise<void> {
        await this.verifyElementVisibleByName(typeOfElement, sectionName);
    }

    public async checkFilterVisibility(filterName: string): Promise<void> {
        const articles = await $$('li a[href*="resources/"]');
    
        for (const article of articles) {
            await article.waitForExist();
            const strong = await article.$(`strong= ${filterName}`);
            const exists = await strong.isExisting();
    
            if (exists) {
                await expect(strong).toBeDisplayed();
            }
        }
    }

    public async enterSearchField(searchQuery: string): Promise<void> {
        await this.SearchField.setValue(searchQuery);
        await browser.keys('Enter');
    }

    public async checkArticleVisibilityByTitle(title: string): Promise<void> {
        const article = await this.getElementByName('li', title);
        await expect(article).toBeDisplayed();
    }
    
    public async toggleAndCheckFilter(filterName: string, expectedState: 'checked' | 'unchecked'): Promise<void> {
        await this.selectFilter(expectedState === 'checked' ? filterName : undefined);

        await this.checkFilterVisibility(filterName);
    }    
    
    public async ensureNoArticlesWithText(text: string): Promise<void> {
        const articles = await $$('li a[href*="resources/"]');
    
        for (const article of articles) {
            const content = await article.getText();
            expect(content).not.toContain(text);
        }
    }
    
    public async validateNoResultsMessage(): Promise<void> {
        const noResultsMessage = this.getElementByName('p', 'No results for this filter');
        await expect(noResultsMessage).toBeDisplayed();
    }

    public async clickNextPageButton(): Promise<void> {
        const nextPageButton = await this.getNextPageButton();
        await nextPageButton.waitForExist({ timeout: 5000 });
        await nextPageButton.scrollIntoView({ block: "center" });
        await nextPageButton.click();
    }
    
    public async clickPrevPageButton(): Promise<void> {
        const prevPageButton = await this.getPrevPageButton();
        await prevPageButton.waitForExist({ timeout: 5000 });
        await prevPageButton.scrollIntoView({ block: "center" });
        await prevPageButton.click();
    }
    
    public async verifyPageInUrl(pageNumber: number): Promise<void> {
        const currentUrl = await browser.getUrl();
        if (pageNumber === 1) {
            const expectedUrlPart = "#articles";
            await expect(currentUrl).toContain(expectedUrlPart);
        } else {
            const expectedUrlPart = `page/${pageNumber}#articles`;
            await expect(currentUrl).toContain(expectedUrlPart);
        }
    }      
}