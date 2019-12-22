import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAplicacao, Aplicacao } from 'app/shared/model/aplicacao.model';
import { AplicacaoService } from './aplicacao.service';
import { IProjeto } from 'app/shared/model/projeto.model';
import { ProjetoService } from 'app/entities/projeto/projeto.service';

@Component({
  selector: 'jhi-aplicacao-update',
  templateUrl: './aplicacao-update.component.html'
})
export class AplicacaoUpdateComponent implements OnInit {
  isSaving = false;

  projetos: IProjeto[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    chave: [],
    projeto: [],
    projeto: []
  });

  constructor(
    protected aplicacaoService: AplicacaoService,
    protected projetoService: ProjetoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aplicacao }) => {
      this.updateForm(aplicacao);

      this.projetoService
        .query()
        .pipe(
          map((res: HttpResponse<IProjeto[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IProjeto[]) => (this.projetos = resBody));
    });
  }

  updateForm(aplicacao: IAplicacao): void {
    this.editForm.patchValue({
      id: aplicacao.id,
      nome: aplicacao.nome,
      chave: aplicacao.chave,
      projeto: aplicacao.projeto,
      projeto: aplicacao.projeto
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aplicacao = this.createFromForm();
    if (aplicacao.id !== undefined) {
      this.subscribeToSaveResponse(this.aplicacaoService.update(aplicacao));
    } else {
      this.subscribeToSaveResponse(this.aplicacaoService.create(aplicacao));
    }
  }

  private createFromForm(): IAplicacao {
    return {
      ...new Aplicacao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      chave: this.editForm.get(['chave'])!.value,
      projeto: this.editForm.get(['projeto'])!.value,
      projeto: this.editForm.get(['projeto'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAplicacao>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProjeto): any {
    return item.id;
  }
}
