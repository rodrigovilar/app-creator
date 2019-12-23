import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAplicacao } from 'app/shared/model/aplicacao.model';
import { AplicacaoService } from './aplicacao.service';

@Component({
  templateUrl: './aplicacao-delete-dialog.component.html'
})
export class AplicacaoDeleteDialogComponent {
  aplicacao?: IAplicacao;

  constructor(protected aplicacaoService: AplicacaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aplicacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('aplicacaoListModification');
      this.activeModal.close();
    });
  }
}
