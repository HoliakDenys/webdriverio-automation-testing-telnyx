import { config as baseConfig } from './wdio.conf';

export const config = {
  ...baseConfig,
  capabilities: [{
    browserName: 'firefox',
    'goog:chromeOptions': {
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    }
  }]
};