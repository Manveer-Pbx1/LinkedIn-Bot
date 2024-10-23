import { ElementHandle, Page } from 'puppeteer';
import LanguageDetect from 'languagedetect';

import buildUrl from '../utils/buildUrl';
import wait from '../utils/wait';
import selectors from '../selectors';

const MAX_PAGE_SIZE = 7;
const languageDetector = new LanguageDetect();

async function getJobSearchMetadata({ page, location, keywords }: { page: Page, location: string, keywords: string }) {
  // Navigate to LinkedIn jobs page
  await page.goto('https://linkedin.com/jobs', { waitUntil: "load" });

  // Wait for the keyword input field to appear and type the search keywords
  await page.waitForSelector(selectors.keywordInput, { visible: true });
  await page.type(selectors.keywordInput, keywords);

  // Wait for the location input field to appear and focus on it
  await page.waitForSelector(selectors.locationInput, { visible: true });
  await page.click(selectors.locationInput); // Focus on the location input

  // Use `page.evaluate` to directly modify the location input value
  await page.evaluate((selector, location) => {
    const locationInput = document.querySelector(selector) as HTMLInputElement;
    if (locationInput) {
      locationInput.value = ''; 
      locationInput.value = location; 
    }
  }, selectors.locationInput, location);

  await page.waitForFunction(
    (selector, location) => {
      const locationInput = document.querySelector(selector) as HTMLInputElement;
      return locationInput && locationInput.value === location;
    },
    {},
    selectors.locationInput,
    location
  );
  await page.keyboard.press('Enter');

  await page.waitForNavigation({ waitUntil: 'load' });
  await page.waitForFunction(() => new URLSearchParams(document.location.search).has('geoId'));

  const geoId = await page.evaluate(() => new URLSearchParams(document.location.search).get('geoId'));

  const numJobsHandle = await page.waitForSelector(selectors.searchResultListText, { timeout: 10000 }) as ElementHandle<HTMLElement>;
  const numAvailableJobs = await numJobsHandle.evaluate((el) => parseInt((el as HTMLElement).innerText.replace(',', '')));

  console.log("Job handle: ", numJobsHandle);
  console.log("Geo ID: ", geoId);
  console.log("number of jobs: ", numAvailableJobs);
  
  return {
    geoId,
    numAvailableJobs
  };
};

interface PARAMS {
  page: Page,
  location: string,
  keywords: string,
  workplace: { remote: boolean, onSite: boolean, hybrid: boolean },
  datePosted: { date_posted_past_week: boolean, date_posted_24_hours: boolean },
  jobTitle: string,
  jobDescription: string,
  jobDescriptionLanguages: string[]
};

/**
 * Fetches job links as a user (logged in)
 */
async function* fetchJobLinksUser({ page, location, keywords, workplace: { remote, onSite, hybrid }, datePosted: { date_posted_24_hours, date_posted_past_week }, jobTitle, jobDescription, jobDescriptionLanguages }: PARAMS): AsyncGenerator<[string, string, string]> {
  let numSeenJobs = 0;
  let numMatchingJobs = 0;
  const fWt = [onSite, remote, hybrid].reduce((acc, c, i) => c ? [...acc, i + 1] : acc, [] as number[]).join(',');

  // Always default to "Past 24 hours" filter if selected
  const datePosted = date_posted_24_hours ? 'r86400' : (date_posted_past_week ? 'r604800' : '');

  const { geoId, numAvailableJobs } = await getJobSearchMetadata({ page, location, keywords });

  const searchParams: { [key: string]: string } = {
    keywords,
    location,
    start: numSeenJobs.toString(),
    f_WT: fWt,
    f_TPR: datePosted, // Add date posted filter (Past 24 hours)
    f_AL: 'true'
  };

  if (geoId) {
    searchParams.geoId = geoId.toString();
  }

  const url = buildUrl('https://www.linkedin.com/jobs/search', searchParams);
  
  const jobTitleRegExp = new RegExp(jobTitle, 'i');
  const jobDescriptionRegExp = new RegExp(jobDescription, 'i');

  while (numSeenJobs < numAvailableJobs) {
    url.searchParams.set('start', numSeenJobs.toString());

    await page.goto(url.toString(), { waitUntil: "load" });

    await page.waitForSelector(`${selectors.searchResultListItem}:nth-child(${Math.min(MAX_PAGE_SIZE, numAvailableJobs - numSeenJobs)})`, { timeout: 5000 });

    const jobListings = await page.$$(selectors.searchResultListItem);

    for (let i = 0; i < Math.min(jobListings.length, MAX_PAGE_SIZE); i++) {
      try {
        const [link, title] = await page.$eval(`${selectors.searchResultListItem}:nth-child(${i + 1}) ${selectors.searchResultListItemLink}`, (el) => {
          const linkEl = el as HTMLLinkElement;
          linkEl.click();
          return [linkEl.href.trim(), linkEl.innerText.trim()];
        });

        console.log("Trying to click the apply button...");
        const applyButton = await page.$(selectors.easyApplyButtonEnabled);
        if (applyButton) {
          await applyButton.click();
          console.log(`Clicked on apply for job: ${title}`);
        } else {
          console.log(`Apply button not found for job: ${title}`);
        }

        const companyName = await page.$eval(`${selectors.searchResultListItem}:nth-child(${i + 1}) ${selectors.searchResultListItemCompanyName}`, el => (el as HTMLElement).innerText).catch(() => 'Unknown');
        const jobDescription = await page.$eval(selectors.jobDescription, el => (el as HTMLElement).innerText);
        const jobDescriptionLanguage = languageDetector.detect(jobDescription, 1)[0][0];
        const matchesLanguage = jobDescriptionLanguages.includes("any") || jobDescriptionLanguages.includes(jobDescriptionLanguage);

        if (matchesLanguage && jobTitleRegExp.test(title) && jobDescriptionRegExp.test(jobDescription)) {
          numMatchingJobs++;
          yield [link, title, companyName];
        }
      } catch (e) {
        console.log(`Error processing job ${i + 1}:`, e);
      }
    }

    await wait(2000);
    numSeenJobs += jobListings.length;
  }
}

export default fetchJobLinksUser;
