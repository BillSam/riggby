/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventTypeComponentsPage from './event-type.page-object';
import { EventTypeDeleteDialog } from './event-type.page-object';
import EventTypeUpdatePage from './event-type-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('EventType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventTypeUpdatePage: EventTypeUpdatePage;
  let eventTypeComponentsPage: EventTypeComponentsPage;
  let eventTypeDeleteDialog: EventTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load EventTypes', async () => {
    await navBarPage.getEntityPage('event-type');
    eventTypeComponentsPage = new EventTypeComponentsPage();
    expect(await eventTypeComponentsPage.getTitle().getText()).to.match(/Event Types/);
  });

  it('should load create EventType page', async () => {
    await eventTypeComponentsPage.clickOnCreateButton();
    eventTypeUpdatePage = new EventTypeUpdatePage();
    expect(await eventTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.eventType.home.createOrEditLabel/);
  });

  it('should create and save EventTypes', async () => {
    const nbButtonsBeforeCreate = await eventTypeComponentsPage.countDeleteButtons();

    await eventTypeUpdatePage.setNameInput('name');
    expect(await eventTypeUpdatePage.getNameInput()).to.match(/name/);
    await eventTypeUpdatePage.setDescriptionInput('description');
    expect(await eventTypeUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(eventTypeUpdatePage.getSaveButton());
    await eventTypeUpdatePage.save();
    await waitUntilHidden(eventTypeUpdatePage.getSaveButton());
    expect(await eventTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

    await eventTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EventType', async () => {
    await eventTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventTypeComponentsPage.countDeleteButtons();
    await eventTypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventTypeDeleteDialog = new EventTypeDeleteDialog();
    expect(await eventTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.eventType.delete.question/);
    await eventTypeDeleteDialog.clickOnConfirmButton();

    await eventTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
