/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MorningSessionsComponentsPage from './morning-sessions.page-object';
import { MorningSessionsDeleteDialog } from './morning-sessions.page-object';
import MorningSessionsUpdatePage from './morning-sessions-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('MorningSessions e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let morningSessionsUpdatePage: MorningSessionsUpdatePage;
  let morningSessionsComponentsPage: MorningSessionsComponentsPage;
  let morningSessionsDeleteDialog: MorningSessionsDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load MorningSessions', async () => {
    await navBarPage.getEntityPage('morning-sessions');
    morningSessionsComponentsPage = new MorningSessionsComponentsPage();
    expect(await morningSessionsComponentsPage.getTitle().getText()).to.match(/Morning Sessions/);
  });

  it('should load create MorningSessions page', async () => {
    await morningSessionsComponentsPage.clickOnCreateButton();
    morningSessionsUpdatePage = new MorningSessionsUpdatePage();
    expect(await morningSessionsUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.morningSessions.home.createOrEditLabel/);
  });

  it('should create and save MorningSessions', async () => {
    const nbButtonsBeforeCreate = await morningSessionsComponentsPage.countDeleteButtons();

    await morningSessionsUpdatePage.setTitleInput('title');
    expect(await morningSessionsUpdatePage.getTitleInput()).to.match(/title/);
    await morningSessionsUpdatePage.setQuoteInput('quote');
    expect(await morningSessionsUpdatePage.getQuoteInput()).to.match(/quote/);
    await morningSessionsUpdatePage.setVerseInput('verse');
    expect(await morningSessionsUpdatePage.getVerseInput()).to.match(/verse/);
    await morningSessionsUpdatePage.setBodyInput('body');
    expect(await morningSessionsUpdatePage.getBodyInput()).to.match(/body/);
    await morningSessionsUpdatePage.setCreatedByInput('createdBy');
    expect(await morningSessionsUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await morningSessionsUpdatePage.setImageInput(absolutePath);
    await waitUntilDisplayed(morningSessionsUpdatePage.getSaveButton());
    await morningSessionsUpdatePage.save();
    await waitUntilHidden(morningSessionsUpdatePage.getSaveButton());
    expect(await morningSessionsUpdatePage.getSaveButton().isPresent()).to.be.false;

    await morningSessionsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await morningSessionsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last MorningSessions', async () => {
    await morningSessionsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await morningSessionsComponentsPage.countDeleteButtons();
    await morningSessionsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    morningSessionsDeleteDialog = new MorningSessionsDeleteDialog();
    expect(await morningSessionsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.morningSessions.delete.question/);
    await morningSessionsDeleteDialog.clickOnConfirmButton();

    await morningSessionsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await morningSessionsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
