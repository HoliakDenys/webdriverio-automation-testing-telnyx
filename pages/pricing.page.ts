import BasePage from "./base.page";
import { endpoints } from "../fixtures/endpoints";
import { pricingLinks } from "../fixtures/pricingLinks";

export default class PricingPage extends BasePage {
    constructor() {
        super(endpoints.pricing);
    }

    public getPricingLinkByText(text: string): ReturnType<WebdriverIO.Browser["$"]> {
        return $(`//a[.//span[text()="${text}"]]`);
    }

    public async clickPricingLinkByText(text: string): Promise<void> {
        const link = await this.getPricingLinkByText(text);
        await link.scrollIntoView({ block: "center" });
        await link.waitForDisplayed({ timeout: 5000 });
        await browser.execute("arguments[0].click();", link);
    }

    public async verifyUrlContainsExpectedPath(text: string): Promise<void> {
        const expectedPath = pricingLinks[text].path;
        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes(expectedPath);
        }, {
            timeout: 5000,
        });
    }

    public async verifyHeader(text: string): Promise<void> {
        const expectedHeader = pricingLinks[text].header;
        const header = await $('h1');
        await header.waitForDisplayed();
        const actualText = await header.getText();
        expect(actualText).toContain(expectedHeader);
    }

    public async testPricingLinkNavigation(text: string): Promise<void> {
        await this.clickPricingLinkByText(text);
        await this.verifyUrlContainsExpectedPath(text);
        await this.verifyHeader(text);
        await browser.back();
    }
}