/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventComponentsPage from './event.page-object';
import { EventDeleteDialog } from './event.page-object';
import EventUpdatePage from './event-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Event e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventUpdatePage: EventUpdatePage;
  let eventComponentsPage: EventComponentsPage;
  let eventDeleteDialog: EventDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Events', async () => {
    await navBarPage.getEntityPage('event');
    eventComponentsPage = new EventComponentsPage();
    expect(await eventComponentsPage.getTitle().getText()).to.match(/Events/);
  });

  it('should load create Event page', async () => {
    await eventComponentsPage.clickOnCreateButton();
    eventUpdatePage = new EventUpdatePage();
    expect(await eventUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.event.home.createOrEditLabel/);
  });

  it('should create and save Events', async () => {
    const nbButtonsBeforeCreate = await eventComponentsPage.countDeleteButtons();

    await eventUpdatePage.setTitleInput('title');
    expect(await eventUpdatePage.getTitleInput()).to.match(/title/);
    await eventUpdatePage.setDescriptionInput('description');
    expect(await eventUpdatePage.getDescriptionInput()).to.match(/description/);
    await eventUpdatePage.setDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eventUpdatePage.getDueDateInput()).to.contain('2001-01-01T02:30');
    await eventUpdatePage.eventCategorySelectLastOption();
    const selectedStatus = await eventUpdatePage.getStatusInput().isSelected();
    if (selectedStatus) {
      await eventUpdatePage.getStatusInput().click();
      expect(await eventUpdatePage.getStatusInput().isSelected()).to.be.false;
    } else {
      await eventUpdatePage.getStatusInput().click();
      expect(await eventUpdatePage.getStatusInput().isSelected()).to.be.true;
    }
    await eventUpdatePage.setCreatedByInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eventUpdatePage.getCreatedByInput()).to.contain('2001-01-01T02:30');
    await eventUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eventUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await eventUpdatePage.setImageInput(absolutePath);
    await eventUpdatePage.targetGroupSelectLastOption();
    await eventUpdatePage.eventSelectLastOption();
    await waitUntilDisplayed(eventUpdatePage.getSaveButton());
    await eventUpdatePage.save();
    await waitUntilHidden(eventUpdatePage.getSaveButton());
    expect(await eventUpdatePage.getSaveButton().isPresent()).to.be.false;

    await eventComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Event', async () => {
    await eventComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventComponentsPage.countDeleteButtons();
    await eventComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventDeleteDialog = new EventDeleteDialog();
    expect(await eventDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.event.delete.question/);
    await eventDeleteDialog.clickOnConfirmButton();

    await eventComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
