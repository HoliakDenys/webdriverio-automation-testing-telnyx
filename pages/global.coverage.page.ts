import BasePage from "./base.page";
import { endpoints } from "../fixtures/endpoints";

export default class GlobalCoveragePage extends BasePage {
    constructor() {
        super(endpoints.globalCoverage);
    }

    public get NumberTypesButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $("//button[@role='tab' and contains(text(), 'Number types')]");
    }

    public get CoverageTableNumberTypesTab(): ReturnType<WebdriverIO.Browser["$"]> {
        return $('table tbody');
    }

    public get ResetFiltersButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $("//button[contains(., 'Reset filters')]");
    }    

    public get SearchCountryButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $(`//button[.//span[contains(text(), 'Search country')]]`);
    }       

    public async clickNumberTypesButton(): Promise<void> {
        await this.NumberTypesButton.scrollIntoView();
        await this.NumberTypesButton.waitForClickable();
        await this.NumberTypesButton.click();
    }

    public async selectCountryFromDropdown(countryName: string): Promise<void> {
        const dropdownBtn = await this.SearchCountryButton;
        await dropdownBtn.waitForClickable({ timeout: 5000 });
        await dropdownBtn.scrollIntoView();
        await dropdownBtn.click();

        const menuContainer = await $('div[role="menu"]');
        await menuContainer.waitForDisplayed({ timeout: 3000 });

        const countryItem = await $(`//div[@role='menuitemcheckbox']//span[text()='${countryName}']`);
        await countryItem.scrollIntoView({ block: 'center' });
        await countryItem.waitForDisplayed({ timeout: 5000 });

        await browser.execute('arguments[0].click()', countryItem);

        await dropdownBtn.click();
    }
    
    public async verifyFilteringResults(expectedText: string): Promise<void> {
        await browser.waitUntil(
            async () => {
                const rows = await $$('table tbody tr');
                if (await rows.length === 0) return false;
                const rowText = await rows[0].getText();
                return rowText.includes(expectedText);
            },
            {
                timeout: 7000,
            }
        );
    }
    
    
    public async verifyFilteringAndReset(country: string): Promise<void> {
        const rowsBefore = await this.CoverageTableNumberTypesTab.$$('tr');
        const initialCount = rowsBefore.length;
    
        await this.selectCountryFromDropdown(country);
    
        const filteredRows = await $$('table tbody tr');
        await expect(filteredRows.length).toBe(1);
    
        await this.ResetFiltersButton.click();
    
        await browser.waitUntil(
            async () => {
                const afterReset = await $$('table tbody tr');
                return await afterReset.length > 1;
            },
            {
                timeout: 7000,
            }
        );
        await browser.pause(1000);
    
        const finalRows = await $$('table tbody tr');
        await expect(finalRows.length).toBe(initialCount);
    }
}