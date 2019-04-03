import { element, by, ElementFinder } from 'protractor';

export default class TaskUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.task.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#task-title'));
  descriptionInput: ElementFinder = element(by.css('input#task-description'));
  createdByInput: ElementFinder = element(by.css('input#task-createdBy'));
  createdAtInput: ElementFinder = element(by.css('input#task-createdAt'));
  frequencySelect: ElementFinder = element(by.css('select#task-frequency'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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

  async setFrequencySelect(frequency) {
    await this.frequencySelect.sendKeys(frequency);
  }

  async getFrequencySelect() {
    return this.frequencySelect.element(by.css('option:checked')).getText();
  }

  async frequencySelectLastOption() {
    await this.frequencySelect
      .all(by.tagName('option'))
      .last()
      .click();
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
