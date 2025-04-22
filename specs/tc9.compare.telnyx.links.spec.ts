import HomePage from "../pages/home.page";
import { footerLinks } from "../fixtures/footerLinks";

const homePage = new HomePage();

describe("Home Page - Footer links validation", () => {

    beforeEach(async () => {
        await homePage.open();
    });

    Object.entries(footerLinks).forEach(([linkText, expectedUrl]) => {
        it(`should navigate to correct page when clicking "${linkText}"`, async () => {
            await homePage.clickFooterLinkByText(linkText);
            await homePage.verifyUrlContains(expectedUrl);
        });
    });
});