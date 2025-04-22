import IotSimPage from "../pages/iot.sim.page";

const iotSimPage = new IotSimPage();
const languages: Array<string> = ['Japanese', 'Korean'];

describe('IoT SIM Card Page - Language localization functionality', () => {

    beforeEach(async () => {
        await iotSimPage.open();
    });

    languages.forEach(language => {
        it(`should switch to ${language} and display correct localized content`, async () => {
            await iotSimPage.selectLanguageByName(language);
            await iotSimPage.checkLanguage(language);
        });
    });
});