import { element, by, ElementFinder } from 'protractor';

export default class ProfileUpdatePage {
  pageTitle: ElementFinder = element(by.id('riggbyApp.profile.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateOfEmploymentInput: ElementFinder = element(by.css('input#profile-dateOfEmployment'));
  firstNameInput: ElementFinder = element(by.css('input#profile-firstName'));
  secondNameInput: ElementFinder = element(by.css('input#profile-secondName'));
  otherNameInput: ElementFinder = element(by.css('input#profile-otherName'));
  gitProfileInput: ElementFinder = element(by.css('input#profile-gitProfile'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  bioInput: ElementFinder = element(by.css('textarea#profile-bio'));
  genderSelect: ElementFinder = element(by.css('select#profile-gender'));
  projectInput: ElementFinder = element(by.css('input#profile-project'));
  userSelect: ElementFinder = element(by.css('select#profile-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateOfEmploymentInput(dateOfEmployment) {
    await this.dateOfEmploymentInput.sendKeys(dateOfEmployment);
  }

  async getDateOfEmploymentInput() {
    return this.dateOfEmploymentInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setSecondNameInput(secondName) {
    await this.secondNameInput.sendKeys(secondName);
  }

  async getSecondNameInput() {
    return this.secondNameInput.getAttribute('value');
  }

  async setOtherNameInput(otherName) {
    await this.otherNameInput.sendKeys(otherName);
  }

  async getOtherNameInput() {
    return this.otherNameInput.getAttribute('value');
  }

  async setGitProfileInput(gitProfile) {
    await this.gitProfileInput.sendKeys(gitProfile);
  }

  async getGitProfileInput() {
    return this.gitProfileInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  async setBioInput(bio) {
    await this.bioInput.sendKeys(bio);
  }

  async getBioInput() {
    return this.bioInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setProjectInput(project) {
    await this.projectInput.sendKeys(project);
  }

  async getProjectInput() {
    return this.projectInput.getAttribute('value');
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
