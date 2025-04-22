import SolutionsPage from "../pages/solutions.page";

const solutionsPage = new SolutionsPage();
const searchQuery = 'IoT';

describe('Solutions Page - Search Functionality', () => {

    before(async () => {
        await solutionsPage.open();
    });

    it(`shows only articles with titles containing "${searchQuery}"`, async () => {
        await solutionsPage.enterSearchField(searchQuery);
        await solutionsPage.validateArticlesContainSearchText(searchQuery);
    });
});