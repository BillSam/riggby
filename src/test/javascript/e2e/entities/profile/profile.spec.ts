/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfileComponentsPage from './profile.page-object';
import { ProfileDeleteDialog } from './profile.page-object';
import ProfileUpdatePage from './profile-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Profile e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profileUpdatePage: ProfileUpdatePage;
  let profileComponentsPage: ProfileComponentsPage;
  let profileDeleteDialog: ProfileDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Profiles', async () => {
    await navBarPage.getEntityPage('profile');
    profileComponentsPage = new ProfileComponentsPage();
    expect(await profileComponentsPage.getTitle().getText()).to.match(/Profiles/);
  });

  it('should load create Profile page', async () => {
    await profileComponentsPage.clickOnCreateButton();
    profileUpdatePage = new ProfileUpdatePage();
    expect(await profileUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.profile.home.createOrEditLabel/);
  });

  it('should create and save Profiles', async () => {
    const nbButtonsBeforeCreate = await profileComponentsPage.countDeleteButtons();

    await profileUpdatePage.setDateOfEmploymentInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await profileUpdatePage.getDateOfEmploymentInput()).to.contain('2001-01-01T02:30');
    await profileUpdatePage.setFirstNameInput('firstName');
    expect(await profileUpdatePage.getFirstNameInput()).to.match(/firstName/);
    await profileUpdatePage.setSecondNameInput('secondName');
    expect(await profileUpdatePage.getSecondNameInput()).to.match(/secondName/);
    await profileUpdatePage.setOtherNameInput('otherName');
    expect(await profileUpdatePage.getOtherNameInput()).to.match(/otherName/);
    await profileUpdatePage.setGitProfileInput('gitProfile');
    expect(await profileUpdatePage.getGitProfileInput()).to.match(/gitProfile/);
    await profileUpdatePage.setImageInput(absolutePath);
    await profileUpdatePage.setBioInput('bio');
    expect(await profileUpdatePage.getBioInput()).to.match(/bio/);
    await profileUpdatePage.genderSelectLastOption();
    await profileUpdatePage.setProjectInput('project');
    expect(await profileUpdatePage.getProjectInput()).to.match(/project/);
    await profileUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(profileUpdatePage.getSaveButton());
    await profileUpdatePage.save();
    await waitUntilHidden(profileUpdatePage.getSaveButton());
    expect(await profileUpdatePage.getSaveButton().isPresent()).to.be.false;

    await profileComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Profile', async () => {
    await profileComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await profileComponentsPage.countDeleteButtons();
    await profileComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    profileDeleteDialog = new ProfileDeleteDialog();
    expect(await profileDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.profile.delete.question/);
    await profileDeleteDialog.clickOnConfirmButton();

    await profileComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
