# Linkedin easy apply bot

A tool designed to save you time when applying to linkedin jobs by applying to the jobs automatically for you

To run this tool follow the following steps

### First step, clone the project


Run the following command on your built-in terminal in VS Code:

```
git clone https://github.com/Manveer-Pbx1/LinkedIn-Bot.git
```

### Second step, install the project's dependencies:

For this step, make sure you have node installed. You can check it by running the command:

```
node -v
```
If not, you can install it by going to their official website (`(https://nodejs.org/en/download/package-manager)`)

Go to the *LinkedIn-Bot* directory by entering this command:

```
cd LinkedIn-Bot
```

Install the libraries and other dependencies using the following command on your built-in terminal in VS Code

```
npm i
```

### Third step, find modify the config.ts file 

*config.ts has the details you need to fill for your job roles, you can modify it and follow the structure below*

```TS
export default {
  // LOGIN DETAILS
  LINKEDIN_EMAIL: "your-linkedin-email",
  LINKEDIN_PASSWORD: "your-linkedin-password",

  // JOB SEARCH PARAMETERS
  KEYWORDS: "your-job-search-keywords",
  LOCATION: "your-job-search-location",
  WORKPLACE: {
    REMOTE: true, // whether-you-want-remote-jobs-or-not(true/false)
    ON_SITE: true, // whether-you-want-on-site-jobs-or-not(true/false)
    HYBRID: true, // whether-you-want-hybrid-jobs-or-not(true/false)
  },
  JOB_TITLE: "a-regex-to-match-with-the-job-title",
  JOB_DESCRIPTION: "a-regex-to-match-with-the-job-description",

  // FORM DATA
  PHONE: "your-phone-number",
  CV_PATH: "path-to-your-cv",
  COVER_LETTER_PATH: "path-to-your-cover-letter",
  HOME_CITY: "where-you-are-based",
  YEARS_OF_EXPERIENCE: { // an-object-with-the-skills-as-keys-and-the-years-of-experience-as-values
    "angular": 5,
    "react.js": 6,
  },
  LANGUAGE_PROFICIENCY: {  // an-object-with-the-languages-as-keys-and-your-proficiency-as-values
    "english": "professional",
    "spanish": "native",
    "french": "professional"
  },
  REQUIRES_VISA_SPONSORSHIP: false, // whether-you-require-visa-sponsorship-or-not(true/false)
  TEXT_FIELDS: { // an-object-with-the-regexes-to-match-input-labels-as-keys-and-the-input-values-as-values (text value)
    "salary": "60k"
  },
  BOOLEANS: { // an-object-with-the-regexes-to-match-input-labels-as-keys-and-the-input-values-as-values (true/false value)
    "bachelhor|bacharelado": true,
    "authorized": true
  },
  MULTIPLE_CHOICE_FIELDS: { // an-object-with-the-regexes-to-match-input-labels-as-keys-and-the-input-values-as-values (option value)
    "pronouns": "They/them"
  },

  // OTHER SETTINGS
  SINGLE_PAGE: false, // whether-you-want-the-applied-job-windows-to-close-after-applying(true/false)
}
```

### Last step, run the program

  ```
  npm start
  ```

### How the tool is supposed to work

Upon running the program, a new window would appear where first the login would happen automatically, and then, you might need to resolve the captcha on your own as LinkedIn practices to avoid abuse of bots.

After you have solved the captcha, you may see a message on your terminal that says, "Press enter to continue".
