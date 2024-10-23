import puppeteer, { Page } from "puppeteer";
import config from "../config";

import ask from "../utils/ask";
import login from "../login";
import apply, { ApplicationFormData } from "../apply";
import fetchJobLinksUser from "../fetch/fetchJobLinksUser";

interface AppState {
  paused: boolean;
}

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
const state: AppState = {
  paused: false,
};

const askForPauseInput = async () => {
  await ask("press enter to pause the program");

  state.paused = true;

  await ask("finishing job application...\n");

  state.paused = false;
  console.log("unpaused");

  askForPauseInput();
};

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: false,
    args: ["--disable-setuid-sandbox", "--no-sandbox"],
  });
  
  console.log("Opening new page for LinkedIn login...");
  const listingPage = await browser.newPage();
  
  console.log("Logging in...");
  const pages = await browser.pages();

  await pages[0].close();

  await login({
    page: listingPage,
    email: config.LINKEDIN_EMAIL,
    password: config.LINKEDIN_PASSWORD,
  });
  console.log("Logged in successfully.");

  askForPauseInput();

  console.log("Fetching job listings...");
  const linkGenerator = fetchJobLinksUser({
    page: listingPage,
    location: config.LOCATION,
    keywords: config.KEYWORDS,
    workplace: {
      remote: config.WORKPLACE.REMOTE,
      onSite: config.WORKPLACE.ON_SITE,
      hybrid: config.WORKPLACE.HYBRID,
    },
    datePosted:{date_posted_24_hours: config.DATE.DATE_POSTED_24_HOURS,
      date_posted_past_week: config.DATE.DATE_POSTED_PAST_WEEK,
    },
    jobTitle: config.JOB_TITLE,
    jobDescription: config.JOB_DESCRIPTION,
    jobDescriptionLanguages: config.JOB_DESCRIPTION_LANGUAGES,
  });

  let applicationPage: Page | null = null;

  for await (const [link, title, companyName] of linkGenerator) {
    console.log(`Found job: ${title} at ${companyName}, applying...`);
    if (!applicationPage || process.env.SINGLE_PAGE !== "true") {
      console.log("Opening a new page for the job application...");
      applicationPage = await browser.newPage();
    }

    await applicationPage.bringToFront();

    try {
      const formData: ApplicationFormData = {
        phone: config.PHONE,
        cvPath: config.CV_PATH,
        homeCity: config.HOME_CITY,
        coverLetterPath: config.COVER_LETTER_PATH,
        yearsOfExperience: config.YEARS_OF_EXPERIENCE,
        languageProficiency: config.LANGUAGE_PROFICIENCY,
        requiresVisaSponsorship: config.REQUIRES_VISA_SPONSORSHIP,
        booleans: config.BOOLEANS,
        textFields: config.TEXT_FIELDS,
        multipleChoiceFields: config.MULTIPLE_CHOICE_FIELDS,
      };
      console.log("Filling the application form...");
      await apply({
        page: applicationPage,
        link,
        formData,
        shouldSubmit: process.argv[2] === "SUBMIT",
      });

      console.log(`Successfully applied to ${title} at ${companyName}`);
    } catch (err) {
      console.log(`Error applying to ${title} at ${companyName}:`, err);
    }

    await listingPage.bringToFront();

    for (let shouldLog = true; state.paused; shouldLog = false) {
      shouldLog && console.log("\nProgram paused, press enter to continue the program");
      await wait(2000);
    }
  }

  // Uncomment if you want to close the browser after completion
  // console.log("Closing the browser...");
  // await browser.close();
})();
