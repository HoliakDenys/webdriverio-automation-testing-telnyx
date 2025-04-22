import ResourcesPage from "../pages/resources.page";

const resourcesPage = new ResourcesPage();
const articleTitle = 'The future of contact centers: AI adoption guide';
const anchorLinks: Array<string> = [
    "Step-by-step guide to AI implementation with Telnyx", 
    "How AI technologies enhance contact centers", 
    "Market trends: AI's impact on contact centers"]

describe('Resources Page - Article Anchor Links', () => {

    before(async () => {
        await resourcesPage.open();
        await resourcesPage.selectArticle(articleTitle);
    });

    anchorLinks.forEach((linkText) => {
        it(`should scroll to section with anchor link "${linkText}"`, async () => {
            await resourcesPage.toggleLink(linkText);
            await resourcesPage.verifySectionVisible(linkText);
        });
    });
});