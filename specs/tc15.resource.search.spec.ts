import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const articleTitle = 'Choosing the best phone number';

describe('Resources page - search functionality', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it(`should display article with title "${articleTitle}" after search`, async () => {
        await resourcesPage.enterSearchField(articleTitle);
        await resourcesPage.checkArticleVisibilityByTitle(articleTitle);
    });
});