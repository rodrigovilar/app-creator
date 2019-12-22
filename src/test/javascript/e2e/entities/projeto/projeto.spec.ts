import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProjetoComponentsPage, ProjetoDeleteDialog, ProjetoUpdatePage } from './projeto.page-object';

const expect = chai.expect;

describe('Projeto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projetoComponentsPage: ProjetoComponentsPage;
  let projetoUpdatePage: ProjetoUpdatePage;
  let projetoDeleteDialog: ProjetoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Projetos', async () => {
    await navBarPage.goToEntity('projeto');
    projetoComponentsPage = new ProjetoComponentsPage();
    await browser.wait(ec.visibilityOf(projetoComponentsPage.title), 5000);
    expect(await projetoComponentsPage.getTitle()).to.eq('Projetos');
  });

  it('should load create Projeto page', async () => {
    await projetoComponentsPage.clickOnCreateButton();
    projetoUpdatePage = new ProjetoUpdatePage();
    expect(await projetoUpdatePage.getPageTitle()).to.eq('Create or edit a Projeto');
    await projetoUpdatePage.cancel();
  });

  it('should create and save Projetos', async () => {
    const nbButtonsBeforeCreate = await projetoComponentsPage.countDeleteButtons();

    await projetoComponentsPage.clickOnCreateButton();
    await promise.all([
      projetoUpdatePage.setNomeInput('nome'),
      projetoUpdatePage.setChaveInput('chave'),
      projetoUpdatePage.criadorSelectLastOption()
    ]);
    expect(await projetoUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await projetoUpdatePage.getChaveInput()).to.eq('chave', 'Expected Chave value to be equals to chave');
    await projetoUpdatePage.save();
    expect(await projetoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await projetoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Projeto', async () => {
    const nbButtonsBeforeDelete = await projetoComponentsPage.countDeleteButtons();
    await projetoComponentsPage.clickOnLastDeleteButton();

    projetoDeleteDialog = new ProjetoDeleteDialog();
    expect(await projetoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Projeto?');
    await projetoDeleteDialog.clickOnConfirmButton();

    expect(await projetoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
