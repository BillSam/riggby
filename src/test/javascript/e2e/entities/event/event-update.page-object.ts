import { element, by, ElementFinder } from 'protractor';

export default class EventUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.event.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#event-title'));
  descriptionInput: ElementFinder = element(by.css('input#event-description'));
  dueDateInput: ElementFinder = element(by.css('input#event-dueDate'));
  eventCategorySelect: ElementFinder = element(by.css('select#event-eventCategory'));
  statusInput: ElementFinder = element(by.css('input#event-status'));
  createdByInput: ElementFinder = element(by.css('input#event-createdBy'));
  createdAtInput: ElementFinder = element(by.css('input#event-createdAt'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  targetGroupSelect: ElementFinder = element(by.css('select#event-targetGroup'));
  eventSelect: ElementFinder = element(by.css('select#event-event'));

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

  async setDueDateInput(dueDate) {
    await this.dueDateInput.sendKeys(dueDate);
  }

  async getDueDateInput() {
    return this.dueDateInput.getAttribute('value');
  }

  async setEventCategorySelect(eventCategory) {
    await this.eventCategorySelect.sendKeys(eventCategory);
  }

  async getEventCategorySelect() {
    return this.eventCategorySelect.element(by.css('option:checked')).getText();
  }

  async eventCategorySelectLastOption() {
    await this.eventCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getStatusInput() {
    return this.statusInput;
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

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
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
