import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const filterName = 'WEBRTC';

describe('Resources Page - Filter Functionality', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it('should display only articles related to the selected filter', async () => {
        await resourcesPage.selectFilter(filterName);
        await resourcesPage.checkFilterVisibility(filterName);
    });
});