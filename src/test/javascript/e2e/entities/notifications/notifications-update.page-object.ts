import { element, by, ElementFinder } from 'protractor';

export default class NotificationsUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.notifications.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#notifications-title'));
  bodyInput: ElementFinder = element(by.css('textarea#notifications-body'));
  createdByInput: ElementFinder = element(by.css('input#notifications-createdBy'));
  createdAtInput: ElementFinder = element(by.css('input#notifications-createdAt'));
  attachmentInput: ElementFinder = element(by.css('input#file_attachment'));
  statusInput: ElementFinder = element(by.css('input#notifications-status'));
  targetGroupSelect: ElementFinder = element(by.css('select#notifications-targetGroup'));
  userSelect: ElementFinder = element(by.css('select#notifications-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
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

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setAttachmentInput(attachment) {
    await this.attachmentInput.sendKeys(attachment);
  }

  async getAttachmentInput() {
    return this.attachmentInput.getAttribute('value');
  }

  getStatusInput() {
    return this.statusInput;
  }
  async setTargetGroupSelect(targetGroup) {
    await this.targetGroupSelect.sendKeys(targetGroup);
  }

  async getTargetGroupSelect() {
    return this.targetGroupSelect.element(by.css('option:checked')).getText();
  }

  async targetGroupSelectLastOption() {
    await this.targetGroupSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
