require('dotenv').config();

export const config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json'
    }
  },
  specs: ['../specs/**.*.ts'],
  baseUrl: process.env.BASE_URL,
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [['allure', { outputDir: 'allure-results' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  // before: async () => {
  //   const { viewport } = await import('./viewport.conf');
  //   await browser.setWindowSize(viewport.width, viewport.height);
  // },
  afterTest: async (_test: any, _context: any, { passed }: { passed: boolean }) => {
    if (!passed) {
      await browser.takeScreenshot();
    }
  }
};