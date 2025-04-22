import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const firstFilter = 'Video';
const secondFilter = 'e-sim';

describe('Resources Page - Filter Switching Functionality', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it('should switch filters and display only relevant articles', async () => {
        await resourcesPage.toggleAndCheckFilter(firstFilter, 'checked');
        await resourcesPage.toggleAndCheckFilter(secondFilter, 'checked');
        await resourcesPage.ensureNoArticlesWithText(firstFilter);
    });
});