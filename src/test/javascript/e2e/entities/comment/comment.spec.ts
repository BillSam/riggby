/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CommentComponentsPage from './comment.page-object';
import { CommentDeleteDialog } from './comment.page-object';
import CommentUpdatePage from './comment-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Comment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commentUpdatePage: CommentUpdatePage;
  let commentComponentsPage: CommentComponentsPage;
  let commentDeleteDialog: CommentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Comments', async () => {
    await navBarPage.getEntityPage('comment');
    commentComponentsPage = new CommentComponentsPage();
    expect(await commentComponentsPage.getTitle().getText()).to.match(/Comments/);
  });

  it('should load create Comment page', async () => {
    await commentComponentsPage.clickOnCreateButton();
    commentUpdatePage = new CommentUpdatePage();
    expect(await commentUpdatePage.getPageTitle().getAttribute('id')).to.match(/riggbyApp.comment.home.createOrEditLabel/);
  });

  it('should create and save Comments', async () => {
    const nbButtonsBeforeCreate = await commentComponentsPage.countDeleteButtons();

    await commentUpdatePage.setBodyInput('body');
    expect(await commentUpdatePage.getBodyInput()).to.match(/body/);
    await commentUpdatePage.setTitleInput('title');
    expect(await commentUpdatePage.getTitleInput()).to.match(/title/);
    await commentUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await commentUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await commentUpdatePage.eventSelectLastOption();
    await commentUpdatePage.notificationSelectLastOption();
    await commentUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(commentUpdatePage.getSaveButton());
    await commentUpdatePage.save();
    await waitUntilHidden(commentUpdatePage.getSaveButton());
    expect(await commentUpdatePage.getSaveButton().isPresent()).to.be.false;

    await commentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await commentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Comment', async () => {
    await commentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await commentComponentsPage.countDeleteButtons();
    await commentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    commentDeleteDialog = new CommentDeleteDialog();
    expect(await commentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/riggbyApp.comment.delete.question/);
    await commentDeleteDialog.clickOnConfirmButton();

    await commentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await commentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
