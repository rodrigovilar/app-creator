import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAplicacao } from 'app/shared/model/aplicacao.model';
import { AplicacaoService } from './aplicacao.service';
import { AplicacaoDeleteDialogComponent } from './aplicacao-delete-dialog.component';

@Component({
  selector: 'jhi-aplicacao',
  templateUrl: './aplicacao.component.html'
})
export class AplicacaoComponent implements OnInit, OnDestroy {
  aplicacaos?: IAplicacao[];
  eventSubscriber?: Subscription;

  constructor(protected aplicacaoService: AplicacaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.aplicacaoService.query().subscribe((res: HttpResponse<IAplicacao[]>) => {
      this.aplicacaos = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAplicacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAplicacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAplicacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('aplicacaoListModification', () => this.loadAll());
  }

  delete(aplicacao: IAplicacao): void {
    const modalRef = this.modalService.open(AplicacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aplicacao = aplicacao;
  }
}
