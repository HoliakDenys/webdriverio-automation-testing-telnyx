import baseConfig from './wdio.conf';

export const config = {
  ...baseConfig,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          `--user-data-dir=/tmp/chrome-profile-${Date.now()}`
        ]
      }
    }
  ]
};