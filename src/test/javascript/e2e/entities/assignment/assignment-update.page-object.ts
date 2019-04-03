import { element, by, ElementFinder } from 'protractor';

export default class AssignmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.assignment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dueDateInput: ElementFinder = element(by.css('input#assignment-dueDate'));
  dueDayInput: ElementFinder = element(by.css('input#assignment-dueDay'));
  statusInput: ElementFinder = element(by.css('input#assignment-status'));
  createdAtInput: ElementFinder = element(by.css('input#assignment-createdAt'));
  createdByInput: ElementFinder = element(by.css('input#assignment-createdBy'));
  morningSessionSelect: ElementFinder = element(by.css('select#assignment-morningSession'));
  taskSelect: ElementFinder = element(by.css('select#assignment-task'));
  userSelect: ElementFinder = element(by.css('select#assignment-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDueDateInput(dueDate) {
    await this.dueDateInput.sendKeys(dueDate);
  }

  async getDueDateInput() {
    return this.dueDateInput.getAttribute('value');
  }

  async setDueDayInput(dueDay) {
    await this.dueDayInput.sendKeys(dueDay);
  }

  async getDueDayInput() {
    return this.dueDayInput.getAttribute('value');
  }

  getStatusInput() {
    return this.statusInput;
  }
  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy) {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput() {
    return this.createdByInput.getAttribute('value');
  }

  async morningSessionSelectLastOption() {
    await this.morningSessionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async morningSessionSelectOption(option) {
    await this.morningSessionSelect.sendKeys(option);
  }

  getMorningSessionSelect() {
    return this.morningSessionSelect;
  }

  async getMorningSessionSelectedOption() {
    return this.morningSessionSelect.element(by.css('option:checked')).getText();
  }

  async taskSelectLastOption() {
    await this.taskSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async taskSelectOption(option) {
    await this.taskSelect.sendKeys(option);
  }

  getTaskSelect() {
    return this.taskSelect;
  }

  async getTaskSelectedOption() {
    return this.taskSelect.element(by.css('option:checked')).getText();
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
