import HomePage from "../pages/home.page";

const homePage = new HomePage();
const originalModel = "meta-llama/Meta-Llama-3.1-70B-Instruct";
const newModel = "google/gemma-7b-it";

describe('Home Page - AI-powered demo settings persistence', () => {

    before(async () => {
        await homePage.open();
    });

    it('should persist selected model after confirmation', async () => {
        await homePage.clickAdvancedSettingsButton();
        await homePage.switchModel(originalModel, newModel);
        await homePage.clickConfirmButton();
        await homePage.clickAdvancedSettingsButton();
        
        await homePage.verifyButtonVisible(newModel);
    });
});