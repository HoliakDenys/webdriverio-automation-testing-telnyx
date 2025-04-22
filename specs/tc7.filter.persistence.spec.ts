import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const filterName = 'Networking';

describe('Resources Page - Filter persistence', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it(`should display the same result for "${filterName}" filter after reload`, async () => {
        await resourcesPage.selectFilter(filterName);
        await resourcesPage.reloadPage();
        await browser.pause(2000);
        await resourcesPage.checkFilterState('checked', filterName);
    });
});