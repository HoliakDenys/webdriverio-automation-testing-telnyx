import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const filterName = 'Flow';

describe('Resources Page - Filter Functionality', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it('should toggle the filter and display relevant articles accordingly', async () => {
        await resourcesPage.toggleAndCheckFilter(filterName, 'checked');
        await resourcesPage.toggleAndCheckFilter(filterName, 'unchecked');
    });
});