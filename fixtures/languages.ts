export interface LanguageData {
    title: string;
    h1: string;
    urlPart: string;
    buttonText: string;
}

export const languages: Record<string, LanguageData> = {
    Japanese: {
        title: 'Telnyxの高品質IoT SIMカードでグローバルな接続を体験してください',
        h1: 'IoT SIMカード',
        urlPart: 'iot-sim-japan',
        buttonText: '日本語 (Japanese)',
    },
    Korean: {
        title: '글로벌 연결을 위한 IoT SIM 카드 | Telnyx',
        h1: 'IoT SIM 카드',
        urlPart: 'iot-sim-korea',
        buttonText: '한국인 (Korean)',
    },
};