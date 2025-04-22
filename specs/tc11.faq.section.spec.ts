import IotSimPage from "../pages/iot.sim.page";
import { QuestionState, QuestionExpanded } from "../pages/iot.sim.page";

const iotSimPage = new IotSimPage();
const faqQuestion = 'Do Telnyx IoT SIMs support voice?';

describe('IoT SIM Card Page - FAQ Section', () => {

    beforeEach(async () => {
        await iotSimPage.open();
    });

    it('should expand and collapse the FAQ section for "Do Telnyx IoT SIMs support voice?" correctly', async () => {
        await iotSimPage.toggleQuestion(faqQuestion);
        await iotSimPage.checkQuestionState(faqQuestion, QuestionState.Open, QuestionExpanded.True);
        await iotSimPage.toggleQuestion(faqQuestion);
        await iotSimPage.checkQuestionState(faqQuestion, QuestionState.Closed, QuestionExpanded.False);
    });
});