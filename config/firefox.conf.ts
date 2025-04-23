import { config as baseConfig } from './wdio.conf';

export const config = {
  ...baseConfig,
  capabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--headless=new',
        '--disable-gpu',
        `--user-data-dir=/tmp/firefox-profile-${Math.floor(Math.random() * 10000)}`
      ]
    }
  }]
};