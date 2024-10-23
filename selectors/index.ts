export default {
  easyApplyButtonEnabled: ".jobs-s-apply.jobs-s-apply--fadein.inline-flex.mr2 button.jobs-apply-button.artdeco-button.artdeco-button--3.artdeco-button--primary.ember-view",

  // Job search form
  keywordInput: ".jobs-search-box__input.jobs-search-box__input--keyword.jobs-search-box__input--both-bars.jobs-search-box__input--clear-text.jobs-search-box__input--redesigned.jobs-search-box__input--redesigned-small input[type='text']",
  locationInput: ".jobs-search-box__input.jobs-search-box__input--location.jobs-search-box__input--both-bars.jobs-search-box__input--clear-text.jobs-search-box__input--redesigned.jobs-search-box__input--redesigned-small input[type='text']",
  

  // Easy apply form
  checkbox: ".jobs-easy-apply-modal input[type='checkbox']",
  fieldset: ".jobs-easy-apply-modal fieldset",
  select: ".jobs-easy-apply-modal select",
  nextButton: ".jobs-easy-apply-modal footer button[aria-label*='next'], footer button[aria-label*='Review']",
  reviewButton: ".jobs-easy-apply-modal footer button[aria-label*='Review your application']",
  submit: ".jobs-easy-apply-modal footer button[aria-label*='Submit']",
  enabledSubmitOrNextButton: ".jobs-easy-apply-modal footer button[aria-label*='Submit']:enabled, .jobs-easy-apply-modal  footer button[aria-label*='next']:enabled, .jobs-easy-apply-modal  footer button[aria-label*='Review']:enabled",
  textInput: ".jobs-easy-apply-modal input[type='text'], .jobs-easy-apply-modal textarea",
  homeCity: ".jobs-easy-apply-modal input[id*='easyApplyFormElement'][id*='city-HOME-CITY']",
  phone: ".jobs-easy-apply-modal input[id*='easyApplyFormElement'][id*='phoneNumber']",
  documentUpload: ".jobs-easy-apply-modal div[class*='jobs-document-upload']",
  documentUploadLabel: "label[class*='jobs-document-upload']",
  documentUploadInput: "input[type='file'][id*='jobs-document-upload']",
  radioInput: "input[type='radio']",
  option: "option",
  followCompanyCheckbox: 'input[type="checkbox"]#follow-company-checkbox',

  // Login
  captcha: "#captcha-internal",
  emailInput: ".form__input--floating input[type='text']",
  passwordInput: ".form__input--floating input[type='password']",
  loginSubmit: ".login__form_action_container  button[type='submit']",
  skipButton: "button[text()='Skip']",

  // fetch user
  searchResultList: ".jobs-search-results-list",
  searchResultListText: "small.jobs-search-results-list__text",
  searchResultListItem: ".jobs-search-results-list li.jobs-search-results__list-item",
  searchResultListItemLink: "a.job-card-list__title",
  searchResultListItemCompanyName: "div.job-card-container__company-name, a.job-card-container__company-name",
  jobDescription: "div#job-details",
  appliedToJobFeedback: ".artdeco-inline-feedback",

  // fetch guest
  jobCount: ".results-context-header__job-count",
  showMoreButton: ".infinite-scroller__show-more-button:enabled",
  searchResultListItemGuest: ".jobs-search__results-list li",
  searchResultListItemTitleGuest: ".base-search-card__title",
  searchResultListItemSubtitleGuest: ".base-search-card__subtitle",
  searchResultListItemLocationGuest: ".job-search-card__location",

  // get the latest jobs
  datePostedFilterButton: 'button[id*="searchFilter_timePostedRange"]', // Adjust as per actual LinkedIn HTML
  datePosted24HoursOption: 'input[value="r86400"]', // The ID for the "Last 24 hours" radio button
}
