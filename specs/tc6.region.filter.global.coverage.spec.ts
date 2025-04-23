import GlobalCoveragePage from "../pages/global.coverage.page";

const globalCoveragePage = new GlobalCoveragePage();
const regionToFilter = 'Africa';
const expectedCountryInRegion = 'Angola';

describe('Global Coverage Page - Region Filtering Functionality', () => {

    before(async () => {
        await globalCoveragePage.open();
    });

    it(`should filter coverage table by selected region: ${regionToFilter}`, async () => {
        await globalCoveragePage.clickNumberTypesButton();
        await globalCoveragePage.selectOptionFromCountryDropdown(regionToFilter);
        await globalCoveragePage.verifyFilteringResults(expectedCountryInRegion);
    });
});