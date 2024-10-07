import { Page } from 'puppeteer';

import selectors from '../selectors';

async function clickSubmit(page: Page): Promise<void> {
  await page.click(selectors.submit);

//   await page.waitForSelector(selectors.enabledSubmitOrNextButton, { timeout: 10000 });
}

export default clickSubmit;
