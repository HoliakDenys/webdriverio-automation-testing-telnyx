import GlobalCoveragePage from "../pages/global.coverage.page";

const globalCoveragePage = new GlobalCoveragePage();
const countryToFilter = 'Austria';

describe('Global Coverage Page - Country Filtering Functionality', () => {
    
    before(async () => {
        await globalCoveragePage.open();
    });

    it(`should filter coverage table by selected country: ${countryToFilter}`, async () => {
        await globalCoveragePage.clickNumberTypesButton();
        await globalCoveragePage.selectOptionFromCountryDropdown(countryToFilter);
        await globalCoveragePage.verifyFilteringResults(countryToFilter);
    });
});