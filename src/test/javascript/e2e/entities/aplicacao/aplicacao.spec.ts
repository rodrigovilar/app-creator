import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AplicacaoComponentsPage, AplicacaoDeleteDialog, AplicacaoUpdatePage } from './aplicacao.page-object';

const expect = chai.expect;

describe('Aplicacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let aplicacaoComponentsPage: AplicacaoComponentsPage;
  let aplicacaoUpdatePage: AplicacaoUpdatePage;
  let aplicacaoDeleteDialog: AplicacaoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Aplicacaos', async () => {
    await navBarPage.goToEntity('aplicacao');
    aplicacaoComponentsPage = new AplicacaoComponentsPage();
    await browser.wait(ec.visibilityOf(aplicacaoComponentsPage.title), 5000);
    expect(await aplicacaoComponentsPage.getTitle()).to.eq('Aplicacaos');
  });

  it('should load create Aplicacao page', async () => {
    await aplicacaoComponentsPage.clickOnCreateButton();
    aplicacaoUpdatePage = new AplicacaoUpdatePage();
    expect(await aplicacaoUpdatePage.getPageTitle()).to.eq('Create or edit a Aplicacao');
    await aplicacaoUpdatePage.cancel();
  });

  it('should create and save Aplicacaos', async () => {
    const nbButtonsBeforeCreate = await aplicacaoComponentsPage.countDeleteButtons();

    await aplicacaoComponentsPage.clickOnCreateButton();
    await promise.all([
      aplicacaoUpdatePage.setNomeInput('nome'),
      aplicacaoUpdatePage.setChaveInput('chave'),
      aplicacaoUpdatePage.projetoSelectLastOption()
    ]);
    expect(await aplicacaoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await aplicacaoUpdatePage.getChaveInput()).to.eq('chave', 'Expected Chave value to be equals to chave');
    await aplicacaoUpdatePage.save();
    expect(await aplicacaoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await aplicacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Aplicacao', async () => {
    const nbButtonsBeforeDelete = await aplicacaoComponentsPage.countDeleteButtons();
    await aplicacaoComponentsPage.clickOnLastDeleteButton();

    aplicacaoDeleteDialog = new AplicacaoDeleteDialog();
    expect(await aplicacaoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Aplicacao?');
    await aplicacaoDeleteDialog.clickOnConfirmButton();

    expect(await aplicacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
