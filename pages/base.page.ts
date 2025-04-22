export default class BasePage {
    public endpoint: string;

    constructor(endpoint: string = '') {
        this.endpoint = endpoint;
    }

    async open(): Promise<void> {
        const url = this.endpoint || '/';
        await browser.url(url);
    }
}