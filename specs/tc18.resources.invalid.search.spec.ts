import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const invalidSearchQuery = 'the future of WEBRTC';

describe('Resources Page - No Results Message', () => {

    before(async () => {
        await resourcesPage.open();
    });

    it(`should display a message when no articles match the query "${invalidSearchQuery}"`, async () => {
        await resourcesPage.enterSearchField(invalidSearchQuery);
        await resourcesPage.validateNoResultsMessage();
    });
});