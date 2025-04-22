import HomePage from "../pages/home.page";

const homePage = new HomePage();
const platform = 'LinkedIn';

describe('Home Page — Social Media Links', () => {

    before(async () => {
        await homePage.open();
    });

    it('should validate and navigate to the LinkedIn page successfully', async () => {
        await homePage.validateAndClickSocialLink(platform);
    });
});