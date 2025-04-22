import HomePage from "../pages/home.page";
import { QuestionState, QuestionExpanded } from "../pages/iot.sim.page";

const homePage = new HomePage();

const tabsToCheck = ['Products', 'Solutions', 'Why Telnyx', 'Resources', 'Developers'];

describe('Homepage - Navigation menu tabs behavior', () => {

    before(async () => {
        await homePage.open();
        await homePage.clickMenuButton();
    });

    tabsToCheck.forEach((tabName) => {
        it(`should open and close the "${tabName}" menu tab correctly`, async () => {
            await homePage.clickMenuTabByText(tabName);
            await homePage.verifyMenuTab(tabName, QuestionState.Open, QuestionExpanded.True);

            await homePage.clickMenuTabByText(tabName);
            await homePage.verifyMenuTab(tabName, QuestionState.Closed, QuestionExpanded.False);
        });
    });

});