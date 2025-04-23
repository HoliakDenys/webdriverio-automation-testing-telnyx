import { config as baseConfig } from './wdio.conf';

export const config = {
  ...baseConfig,
  capabilities: [{
    browserName: 'chrome',
  }],
};