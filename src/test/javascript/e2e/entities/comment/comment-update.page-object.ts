import { element, by, ElementFinder } from 'protractor';

export default class CommentUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.comment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bodyInput: ElementFinder = element(by.css('textarea#comment-body'));
  titleInput: ElementFinder = element(by.css('input#comment-title'));
  createdAtInput: ElementFinder = element(by.css('input#comment-createdAt'));
  eventSelect: ElementFinder = element(by.css('select#comment-event'));
  notificationSelect: ElementFinder = element(by.css('select#comment-notification'));
  userSelect: ElementFinder = element(by.css('select#comment-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBodyInput(body) {
    await this.bodyInput.sendKeys(body);
  }

  async getBodyInput() {
    return this.bodyInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async eventSelectLastOption() {
    await this.eventSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async eventSelectOption(option) {
    await this.eventSelect.sendKeys(option);
  }

  getEventSelect() {
    return this.eventSelect;
  }

  async getEventSelectedOption() {
    return this.eventSelect.element(by.css('option:checked')).getText();
  }

  async notificationSelectLastOption() {
    await this.notificationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async notificationSelectOption(option) {
    await this.notificationSelect.sendKeys(option);
  }

  getNotificationSelect() {
    return this.notificationSelect;
  }

  async getNotificationSelectedOption() {
    return this.notificationSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
