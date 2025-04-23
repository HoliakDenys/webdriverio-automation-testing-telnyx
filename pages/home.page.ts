    import BasePage from "./base.page";
    import { footerLinks } from "../fixtures/footerLinks"
    import { socialLinks } from "../fixtures/socialLinks"

    export enum QuestionState {
        Open = 'open',
        Closed = 'closed',
    }
    
    export enum QuestionExpanded {
        True = 'true',
        False = 'false',
    }

    export default class HomePage extends BasePage {
        public get confirmButton(): ReturnType<WebdriverIO.Browser["$"]> {
            return $(`//button[normalize-space(.)="Confirm"]`);
        }

        public get MenuButton(): ReturnType<WebdriverIO.Browser["$"]> {
            return $('button[aria-controls="main-menu-content"]');
        }
        
        public get cookieReadMoreButton(): ReturnType<WebdriverIO.Browser["$"]> {
            return $('//div[@id="onetrust-policy-text"]//a[contains(text(), "Read more")]');
        }

        public get advancedSettingsButton(): ReturnType<WebdriverIO.Browser["$"]> {
            return $('button[aria-label="Advanced Settings"]');
        }

        private getModelButton(modelName: string) {
            return $(`//button[.//span[contains(text(), "${modelName}")]]`);
        }    

        private getMenuItemByText(modelName: string) {
            return $(`//div[@role="menuitem" and contains(., "${modelName}")]`);
        }

        private getMenuTabByText(menuTabName: string) {
            return $(`//button[@aria-haspopup="menu" and .//span[text()="${menuTabName}"]]`);
        }        

        public async clickMenuButton(): Promise<void> {
            await this.MenuButton.click();
        }

        public async clickMenuTabByText(menuTabName: string): Promise<void> {
            const menuTab = await this.getMenuTabByText(menuTabName);
            await menuTab.click();
        }

        public async clickAdvancedSettingsButton(): Promise<void> {
            await this.advancedSettingsButton.waitForClickable({ timeout: 5000 });
            await this.advancedSettingsButton.scrollIntoView();
            await this.advancedSettingsButton.click();
        }        

        private async clickLinkByUrl(url: string): Promise<void> {
            const link = await $(`a[href="${url}"]`);
            await link.scrollIntoView({ block: 'center' });
            await link.waitForClickable({ timeout: 3000 });
            await link.click();
        }

        public async clickFooterLinkByText(linkText: string): Promise<void> {
            const url = footerLinks[linkText];
        
            if (!url) {
                throw new Error(`URL for link text "${linkText}" not found in footerLinks`);
            }

            await this.clickLinkByUrl(url);
        }

        public async verifyUrlContains(text: string): Promise<void> {
            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain(text);
            await browser.back();
        }

        public async switchModel(previousModelName: string, newModelName: string): Promise<void> {
            const prev = await this.getModelButton(previousModelName);
            await prev.waitForClickable({ timeout: 5000 });
            await prev.click();
        
            const next = await this.getMenuItemByText(newModelName);
            await next.waitForDisplayed({ timeout: 5000 });
            await next.click();
        }
        
        public async clickConfirmButton(): Promise<void> {
            await this.confirmButton.scrollIntoView();
            await this.confirmButton.click();
        }

        public async verifyButtonVisible(modelName: string): Promise<void> {
            const modelButton = await this.getModelButton(modelName);
            await expect(modelButton).toBeDisplayed();
        }

        public async validateAndClickSocialLink(platformName: string): Promise<void> {
            const url = socialLinks[platformName];
        
            if (!url) {
                throw new Error(`Social URL for platform "${platformName}" not found`);
            }
        
            const response = await browser.call(() => fetch(url));
            if (!response.ok) {
                throw new Error(`Social link "${platformName}" is not valid. Status: ${response.status}`);
            }
        
            const link = await $(`a[href="${url}"]`);
            await link.waitForDisplayed({ timeout: 5000 });
            await expect(link).toHaveAttribute("href", url);
            await expect(link).toHaveAttribute("target");
        
            await this.clickLinkByUrl(url);
        }

        public async clickCookieReadMoreButton(): Promise<void> {
            await this.cookieReadMoreButton.click();
        }

        public async verifyCookiePolicyPageIsOpened(): Promise<void> {
            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain('cookie-policy');
        }
        
        public async verifyMenuTab(menuTabName: string, dataState: string, ariaExpanded: string, ): Promise<void> {
            const menuTab = await this.getMenuTabByText(menuTabName);
        
            await expect(menuTab).toHaveAttribute('aria-expanded', ariaExpanded);
            await expect(menuTab).toHaveAttribute('data-state', dataState);
        }
}