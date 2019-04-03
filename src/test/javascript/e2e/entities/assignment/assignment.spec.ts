/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AssignmentComponentsPage from './assignment.page-object';
import { AssignmentDeleteDialog } from './assignment.page-object';
import AssignmentUpdatePage from './assignment-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Assignment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assignmentUpdatePage: AssignmentUpdatePage;
  let assignmentComponentsPage: AssignmentComponentsPage;
  let assignmentDeleteDialog: AssignmentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Assignments', async () => {
    await navBarPage.getEntityPage('assignment');
    assignmentComponentsPage = new AssignmentComponentsPage();
    expect(await assignmentComponentsPage.getTitle().getText()).to.match(/Assignments/);
  });

  it('should load create Assignment page', async () => {
    await assignmentComponentsPage.clickOnCreateButton();
    assignmentUpdatePage = new AssignmentUpdatePage();
    expect(await assignmentUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.assignment.home.createOrEditLabel/);
  });

  it('should create and save Assignments', async () => {
    const nbButtonsBeforeCreate = await assignmentComponentsPage.countDeleteButtons();

    await assignmentUpdatePage.setDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await assignmentUpdatePage.getDueDateInput()).to.contain('2001-01-01T02:30');
    await assignmentUpdatePage.setDueDayInput('dueDay');
    expect(await assignmentUpdatePage.getDueDayInput()).to.match(/dueDay/);
    const selectedStatus = await assignmentUpdatePage.getStatusInput().isSelected();
    if (selectedStatus) {
      await assignmentUpdatePage.getStatusInput().click();
      expect(await assignmentUpdatePage.getStatusInput().isSelected()).to.be.false;
    } else {
      await assignmentUpdatePage.getStatusInput().click();
      expect(await assignmentUpdatePage.getStatusInput().isSelected()).to.be.true;
    }
    await assignmentUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await assignmentUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await assignmentUpdatePage.setCreatedByInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await assignmentUpdatePage.getCreatedByInput()).to.contain('2001-01-01T02:30');
    await assignmentUpdatePage.morningSessionSelectLastOption();
    await assignmentUpdatePage.taskSelectLastOption();
    // assignmentUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(assignmentUpdatePage.getSaveButton());
    await assignmentUpdatePage.save();
    await waitUntilHidden(assignmentUpdatePage.getSaveButton());
    expect(await assignmentUpdatePage.getSaveButton().isPresent()).to.be.false;

    await assignmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await assignmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Assignment', async () => {
    await assignmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await assignmentComponentsPage.countDeleteButtons();
    await assignmentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    assignmentDeleteDialog = new AssignmentDeleteDialog();
    expect(await assignmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.assignment.delete.question/);
    await assignmentDeleteDialog.clickOnConfirmButton();

    await assignmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await assignmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
