# webdriver-automation-testing-telnyx

## Summary

This project automates end-to-end testing for the [Telnyx](https://telnyx.com) website using **WebdriverIO**, **TypeScript**, **Mocha**, and **Allure**.  
Tests are run inside a **Docker container** to ensure consistency across environments, and the generated **Allure Report** is automatically deployed to **GitHub Pages** on each push to the `main` branch.

---

## Test Cases

All test cases are documented in the following Google Sheet:

[Telnyx Test Cases](https://docs.google.com/spreadsheets/d/1cPNvnhRZBOphgx9h13NlIkpKPbItQZJ9u26zrFOLU9g/edit?usp=sharing)

---

## Requirements

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/)
- [Allure Commandline](https://docs.qameta.io/allure/) (via `npm`)

---

## Setup

Clone the repo:

```bash
git clone https://github.com/HoliakDenys/webdriverio-automation-testing-telnyx.git
cd webdriverio-automation-testing-telnyx
