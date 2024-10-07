import { Page } from 'puppeteer';

import selectors from '../selectors';

async function clickReviewButton(page: Page): Promise<void> {
  await page.click(selectors.reviewButton);

  await page.waitForSelector(selectors.enabledSubmitOrNextButton, { timeout: 10000 });
}

export default clickReviewButton;
