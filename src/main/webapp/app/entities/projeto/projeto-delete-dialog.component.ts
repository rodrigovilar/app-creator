import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProjeto } from 'app/shared/model/projeto.model';
import { ProjetoService } from './projeto.service';

@Component({
  templateUrl: './projeto-delete-dialog.component.html'
})
export class ProjetoDeleteDialogComponent {
  projeto?: IProjeto;

  constructor(protected projetoService: ProjetoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.projetoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('projetoListModification');
      this.activeModal.close();
    });
  }
}
