import HomePage from "../pages/home.page";

const homePage = new HomePage();

describe('Home Page — Cookie Policy Link', () => {

    before(async () => {
        await homePage.open();
    });

    it('should navigate to the Cookie Policy page when clicking Read More', async () => {
        await homePage.clickCookieReadMoreButton();
        await homePage.verifyCookiePolicyPageIsOpened();
    });
});