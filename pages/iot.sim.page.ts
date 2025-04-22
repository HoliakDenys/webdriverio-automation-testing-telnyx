import BasePage from "./base.page";
import { endpoints } from "../fixtures/endpoints";
import { languages } from "../fixtures/languages";

export enum QuestionState {
    Open = 'open',
    Closed = 'closed',
}

export enum QuestionExpanded {
    True = 'true',
    False = 'false',
}

export default class IotSimPage extends BasePage {
    constructor() {
        super(endpoints.iotSim);
    }

    public get languageButton(): ReturnType<WebdriverIO.Browser["$"]> {
        return $('button[role="combobox"][data-state="closed"]');
    }
    
    public getQuestion(question: string): ReturnType<WebdriverIO.Browser["$"]> {
        return $(`//div[@data-state and @data-orientation]//h3[normalize-space(.)="${question}"]`);
    }

    private async checkH1Text(expectedText: string): Promise<void> {
        const h1Element = $('h1');
        const text = await h1Element.getText();
        await expect(text).toBe(expectedText);
    }

    private async checkLanguageButton(expectedText: string): Promise<void> {
        const buttonText = await this.languageButton.getText();
        await expect(buttonText).toBe(expectedText);
    }

    public async selectLanguageByName(languageName: string): Promise<void> {
        await this.languageButton.click();
        const languageOption = $(`//span[contains(text(),"${languageName}")]`);
        await languageOption.click();
    }

    public async checkLanguage(language: string): Promise<void> {
        const langData = languages[language];

        await browser.waitUntil(
            async () => (await browser.getTitle()) === langData.title,
            {
                timeout: 4000,
            }
        );
    
        await this.checkH1Text(langData.h1);
        await this.checkLanguageButton(langData.buttonText);
    
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain(langData.urlPart);
    }

    public async toggleQuestion(text: string): Promise<void> {
        const question = await this.getQuestion(text);
        await question.click();
    }

    public async checkQuestionState(question: string, dataState: string, ariaExpanded: string): Promise<void> {
        const element = await this.getQuestion(question);
        const parent = await element.parentElement();
    
        await expect(parent).toHaveAttribute('data-state', dataState);
        await expect(parent).toHaveAttribute('aria-expanded', ariaExpanded);
    }    
}