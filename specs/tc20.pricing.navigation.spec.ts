import PricingPage from '../pages/pricing.page';

const pricingPage = new PricingPage();
const linksToTest = [
    "Messaging API",
    "SIP Trunking",
    "Voice API",
    "Global Numbers",
    "Video API",
    "Number Lookup API",
    "Verify API"
];

describe('Pricing Page navigation', () => {

    before(async () => {
        await pricingPage.open();
    });

    for (const linkText of linksToTest) {
        it(`should navigate to ${linkText} section, verify URL and header`, async () => {
            await pricingPage.testPricingLinkNavigation(linkText);
        });
    }
});