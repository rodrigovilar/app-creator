import { element, by, ElementFinder } from 'protractor';

export class ProjetoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-projeto div table .btn-danger'));
  title = element.all(by.css('jhi-projeto div h2#page-heading span')).first();

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

export class ProjetoUpdatePage {
  pageTitle = element(by.id('jhi-projeto-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nomeInput = element(by.id('field_nome'));
  chaveInput = element(by.id('field_chave'));
  criadorSelect = element(by.id('field_criador'));

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

  async criadorSelectLastOption(): Promise<void> {
    await this.criadorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async criadorSelectOption(option: string): Promise<void> {
    await this.criadorSelect.sendKeys(option);
  }

  getCriadorSelect(): ElementFinder {
    return this.criadorSelect;
  }

  async getCriadorSelectedOption(): Promise<string> {
    return await this.criadorSelect.element(by.css('option:checked')).getText();
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

export class ProjetoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-projeto-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-projeto'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
