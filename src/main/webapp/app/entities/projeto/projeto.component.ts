import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjeto } from 'app/shared/model/projeto.model';
import { ProjetoService } from './projeto.service';
import { ProjetoDeleteDialogComponent } from './projeto-delete-dialog.component';

@Component({
  selector: 'jhi-projeto',
  templateUrl: './projeto.component.html'
})
export class ProjetoComponent implements OnInit, OnDestroy {
  projetos?: IProjeto[];
  eventSubscriber?: Subscription;

  constructor(protected projetoService: ProjetoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.projetoService.query().subscribe((res: HttpResponse<IProjeto[]>) => {
      this.projetos = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProjetos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProjeto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProjetos(): void {
    this.eventSubscriber = this.eventManager.subscribe('projetoListModification', () => this.loadAll());
  }

  delete(projeto: IProjeto): void {
    const modalRef = this.modalService.open(ProjetoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.projeto = projeto;
  }
}
