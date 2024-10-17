export default {
  // LOGIN DETAILS
  LINKEDIN_EMAIL: "",
  LINKEDIN_PASSWORD: "",

  // JOB SEARCH PARAMETERS
  KEYWORDS: "javascript",
  LOCATION: "Portugal",
  WORKPLACE: {
    REMOTE: true,
    ON_SITE: true,  
    HYBRID: false,
  },
  JOB_TITLE: "(javascript|frontend|front-end|fullstack|full-stack|nodejs|node|js|aws|devops|linux).*(developer|engineer)",
  JOB_DESCRIPTION: "^((?!(primeit))(.|[\n\r]))*$",
  JOB_DESCRIPTION_LANGUAGES: ["portuguese", "english"], // replace value with ["any"] to accept all job description laguages

  // FORM DATA
  PHONE: "912345678",
  CV_PATH: "./sample_cv.pdf",
  COVER_LETTER_PATH: "./sample_cv.pdf",
  HOME_CITY: "Lisbon, Portugal",
  YEARS_OF_EXPERIENCE: {
    "angular": 5,
    "react.js": 6,
    ".net": 3,
    "php": 4,
    "spring": 4,
    "spring boot": 4,
    "java": 4,
    "magento": 5,
    "node": 5,
    "nodejs": 5,
    "javascript": 5,
    "mongodb": 5,
    "kubernetes": 5,
    "CI/CD": 5,
    "python": 5,
    "drupal": 5,
    "sass": 5,
    "html": 5,
    "google cloud": 5,
    "docker": 5,
    "terraform": 5,
    "css": 4,
    "typescript": 6,
    "webmethods": 5,
    "web methods": 5,
    "webmethods.io": 5,
    "devops": 2,
    "aws": 2,
    "azure": 2,
    "linux": 2,
    "unix": 2,
    "vue": 4,
    "vuejs": 4,
    "laravel": 4,
    "jenkins": 2,
    "capacitor": 4,
    "react native": 4,
    "react-native": 4,
    "ionic": 4,
    "ionic framework": 4,
    "android": 5,
    "ios": 5,
    "mobile apps": 5,
    "graphql": 5,
    "jquery": 5,
    "bootstrap": 5,
    ".NET": 5,
    "dotnet": 5,
    "Amazon Web Services": 5,
    "Adobe Experience Manager": 2,
    "Adobe Analytics": 2,
    "Adobe Target": 2,
    "Adobe Campaign": 2,
  },
  LANGUAGE_PROFICIENCY: {
    "english": "professional",
    "spanish": "native",
    "french": "native"
  },
  REQUIRES_VISA_SPONSORSHIP: false,
  TEXT_FIELDS: { "salary": "60k"
    
   },
  BOOLEANS: {
    "bachelhor|bacharelado": true,
    "authorized": true,
    "law": true,
    "remote setting": true,
    "bachelor's degree": false,
    "following level of education": false,
    "starting salary": true,
    "currently based in Portugal": true,
    "hybrid": true,
    "commuting": true,
    "comfortable": true,
    "allowed to work in Portugal": true,
    "Europe": true,
    "Europe Union": true
  },
  MULTIPLE_CHOICE_FIELDS: { "pronouns": "They/them",
    "where are you based": "Portugal"
   },
  
  SINGLE_PAGE: false,
  // OTHER SETTINGS
  USER_DETAILS: {
  GENDER: "Male",
  ETHNICITY: "Black",
  AGE_GREATER_THAN_18: true,
  EDUCATION: "HS Diploma",
  LOCATED_OUTSIDE_OF_USA: false,
  RELOCATE: false

  }
  
}
