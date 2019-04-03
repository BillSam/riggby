import { element, by, ElementFinder } from 'protractor';

export default class MorningSessionsUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.morningSessions.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#morning-sessions-title'));
  quoteInput: ElementFinder = element(by.css('input#morning-sessions-quote'));
  verseInput: ElementFinder = element(by.css('input#morning-sessions-verse'));
  bodyInput: ElementFinder = element(by.css('textarea#morning-sessions-body'));
  createdByInput: ElementFinder = element(by.css('input#morning-sessions-createdBy'));
  imageInput: ElementFinder = element(by.css('input#file_image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setQuoteInput(quote) {
    await this.quoteInput.sendKeys(quote);
  }

  async getQuoteInput() {
    return this.quoteInput.getAttribute('value');
  }

  async setVerseInput(verse) {
    await this.verseInput.sendKeys(verse);
  }

  async getVerseInput() {
    return this.verseInput.getAttribute('value');
  }

  async setBodyInput(body) {
    await this.bodyInput.sendKeys(body);
  }

  async getBodyInput() {
    return this.bodyInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy) {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput() {
    return this.createdByInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
