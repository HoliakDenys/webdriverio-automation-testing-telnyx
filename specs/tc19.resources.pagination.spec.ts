import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();

describe('Resources Page - Pagination', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it('should navigate to the next page and then back to the previous page', async () => {
        await resourcesPage.clickNextPageButton();
        await resourcesPage.verifyPageInUrl(2);
        await resourcesPage.clickPrevPageButton();
        await resourcesPage.verifyPageInUrl(1);
    });
});