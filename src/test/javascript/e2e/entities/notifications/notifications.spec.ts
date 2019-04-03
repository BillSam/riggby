/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NotificationsComponentsPage from './notifications.page-object';
import { NotificationsDeleteDialog } from './notifications.page-object';
import NotificationsUpdatePage from './notifications-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Notifications e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let notificationsUpdatePage: NotificationsUpdatePage;
  let notificationsComponentsPage: NotificationsComponentsPage;
  let notificationsDeleteDialog: NotificationsDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Notifications', async () => {
    await navBarPage.getEntityPage('notifications');
    notificationsComponentsPage = new NotificationsComponentsPage();
    expect(await notificationsComponentsPage.getTitle().getText()).to.match(/Notifications/);
  });

  it('should load create Notifications page', async () => {
    await notificationsComponentsPage.clickOnCreateButton();
    notificationsUpdatePage = new NotificationsUpdatePage();
    expect(await notificationsUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.notifications.home.createOrEditLabel/);
  });

  it('should create and save Notifications', async () => {
    const nbButtonsBeforeCreate = await notificationsComponentsPage.countDeleteButtons();

    await notificationsUpdatePage.setTitleInput('title');
    expect(await notificationsUpdatePage.getTitleInput()).to.match(/title/);
    await notificationsUpdatePage.setBodyInput('body');
    expect(await notificationsUpdatePage.getBodyInput()).to.match(/body/);
    await notificationsUpdatePage.setCreatedByInput('createdBy');
    expect(await notificationsUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await notificationsUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await notificationsUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await notificationsUpdatePage.setAttachmentInput(absolutePath);
    const selectedStatus = await notificationsUpdatePage.getStatusInput().isSelected();
    if (selectedStatus) {
      await notificationsUpdatePage.getStatusInput().click();
      expect(await notificationsUpdatePage.getStatusInput().isSelected()).to.be.false;
    } else {
      await notificationsUpdatePage.getStatusInput().click();
      expect(await notificationsUpdatePage.getStatusInput().isSelected()).to.be.true;
    }
    await notificationsUpdatePage.targetGroupSelectLastOption();
    await notificationsUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(notificationsUpdatePage.getSaveButton());
    await notificationsUpdatePage.save();
    await waitUntilHidden(notificationsUpdatePage.getSaveButton());
    expect(await notificationsUpdatePage.getSaveButton().isPresent()).to.be.false;

    await notificationsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await notificationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Notifications', async () => {
    await notificationsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await notificationsComponentsPage.countDeleteButtons();
    await notificationsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    notificationsDeleteDialog = new NotificationsDeleteDialog();
    expect(await notificationsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.notifications.delete.question/);
    await notificationsDeleteDialog.clickOnConfirmButton();

    await notificationsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await notificationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
