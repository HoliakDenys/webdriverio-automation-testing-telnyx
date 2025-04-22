import SolutionsPage from "../pages/solutions.page";

const solutionsPage = new SolutionsPage();
const invalidSearchQuery = 'Callback';

describe('Solutions Page - No Results Message', () => {

    before(async () => {
        await solutionsPage.open();
    });

    it(`should display a message when no articles match the query "${invalidSearchQuery}"`, async () => {
        await solutionsPage.enterSearchField(invalidSearchQuery);
        await solutionsPage.validateNoResultsMessage();
    });
});