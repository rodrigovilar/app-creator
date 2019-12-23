import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAplicacao } from 'app/shared/model/aplicacao.model';

@Component({
  selector: 'jhi-aplicacao-detail',
  templateUrl: './aplicacao-detail.component.html'
})
export class AplicacaoDetailComponent implements OnInit {
  aplicacao: IAplicacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aplicacao }) => {
      this.aplicacao = aplicacao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
