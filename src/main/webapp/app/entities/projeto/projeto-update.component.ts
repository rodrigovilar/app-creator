import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProjeto, Projeto } from 'app/shared/model/projeto.model';
import { ProjetoService } from './projeto.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-projeto-update',
  templateUrl: './projeto-update.component.html'
})
export class ProjetoUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    chave: [],
    criador: []
  });

  constructor(
    protected projetoService: ProjetoService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projeto }) => {
      this.updateForm(projeto);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));
    });
  }

  updateForm(projeto: IProjeto): void {
    this.editForm.patchValue({
      id: projeto.id,
      nome: projeto.nome,
      chave: projeto.chave,
      criador: projeto.criador
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projeto = this.createFromForm();
    if (projeto.id !== undefined) {
      this.subscribeToSaveResponse(this.projetoService.update(projeto));
    } else {
      this.subscribeToSaveResponse(this.projetoService.create(projeto));
    }
  }

  private createFromForm(): IProjeto {
    return {
      ...new Projeto(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      chave: this.editForm.get(['chave'])!.value,
      criador: this.editForm.get(['criador'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjeto>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
