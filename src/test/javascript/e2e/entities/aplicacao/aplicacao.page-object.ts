import { element, by, ElementFinder } from 'protractor';

export class AplicacaoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-aplicacao div table .btn-danger'));
  title = element.all(by.css('jhi-aplicacao div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class AplicacaoUpdatePage {
  pageTitle = element(by.id('jhi-aplicacao-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  chaveInput = element(by.id('field_chave'));
  projetoSelect = element(by.id('field_projeto'));
  projetoSelect = element(by.id('field_projeto'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setChaveInput(chave: string): Promise<void> {
    await this.chaveInput.sendKeys(chave);
  }

  async getChaveInput(): Promise<string> {
    return await this.chaveInput.getAttribute('value');
  }

  async projetoSelectLastOption(): Promise<void> {
    await this.projetoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projetoSelectOption(option: string): Promise<void> {
    await this.projetoSelect.sendKeys(option);
  }

  getProjetoSelect(): ElementFinder {
    return this.projetoSelect;
  }

  async getProjetoSelectedOption(): Promise<string> {
    return await this.projetoSelect.element(by.css('option:checked')).getText();
  }

  async projetoSelectLastOption(): Promise<void> {
    await this.projetoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projetoSelectOption(option: string): Promise<void> {
    await this.projetoSelect.sendKeys(option);
  }

  getProjetoSelect(): ElementFinder {
    return this.projetoSelect;
  }

  async getProjetoSelectedOption(): Promise<string> {
    return await this.projetoSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AplicacaoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-aplicacao-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-aplicacao'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
