import { Page } from 'puppeteer';

import selectors from '../selectors';
import fillFields from '../apply-form/fillFields';
import fillBoolean from '../apply-form/fillBoolean';
import fillTextFields from '../apply-form/fillTextFields';
import uncheckFollowCompany from '../apply-form/uncheckFollowCompany';
import fillMultipleChoiceFields from '../apply-form/fillMultipleChoiceFields';
import waitForNoError from '../apply-form/waitForNoError';
import clickReviewButton from '../apply-form/clickReviewButton';
import clickNextButton from '../apply-form/clickNextButton';
import clickSubmit from '../apply-form/clickSubmit';

const noop = () => { };

async function clickEasyApplyButton(page: Page): Promise<void> {
  await page.waitForSelector(selectors.easyApplyButtonEnabled, { timeout: 10000 });
  await page.click(selectors.easyApplyButtonEnabled);
}

export interface ApplicationFormData {
  phone: string;
  cvPath: string;
  homeCity: string;
  coverLetterPath: string;
  yearsOfExperience: { [key: string]: number };
  languageProficiency: { [key: string]: string };
  requiresVisaSponsorship: boolean;
  booleans: { [key: string]: boolean };
  textFields: { [key: string]: string };
  multipleChoiceFields: { [key: string]: string };
}

interface Params {
  page: Page;
  link: string;
  formData: ApplicationFormData;
  shouldSubmit: boolean;
}

async function apply({ page, link, formData, shouldSubmit }: Params): Promise<void> {
  await page.goto(link, { waitUntil: 'load', timeout: 60000 });

  try {
    await clickEasyApplyButton(page);
  } catch {
    console.log(`Easy apply button not found in posting: ${link}`);
    return;
  }

  let maxPages = 5;

  while (maxPages--) {
    await fillFields(page, formData).catch(noop);
    // await fillTextFields(page, formData.textFields).catch(noop);
    // await fillBoolean(page, formData.booleans).catch(noop);
    // await fillMultipleChoiceFields(page, formData.multipleChoiceFields).catch(noop);
    await clickReviewButton(page).catch(noop);
    await clickNextButton(page).catch(noop);
    await uncheckFollowCompany(page).catch(noop);
    await waitForNoError(page).catch(noop);
    await clickSubmit(page).catch(noop);
  }

  const submitButton = await page.$(selectors.submit);

  if (!submitButton) {
    throw new Error('Submit button not found');
  }

  if (shouldSubmit) {
    await submitButton.click();
  }
}

export default apply;