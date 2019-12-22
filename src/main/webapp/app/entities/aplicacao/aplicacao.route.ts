import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAplicacao, Aplicacao } from 'app/shared/model/aplicacao.model';
import { AplicacaoService } from './aplicacao.service';
import { AplicacaoComponent } from './aplicacao.component';
import { AplicacaoDetailComponent } from './aplicacao-detail.component';
import { AplicacaoUpdateComponent } from './aplicacao-update.component';

@Injectable({ providedIn: 'root' })
export class AplicacaoResolve implements Resolve<IAplicacao> {
  constructor(private service: AplicacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAplicacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((aplicacao: HttpResponse<Aplicacao>) => {
          if (aplicacao.body) {
            return of(aplicacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Aplicacao());
  }
}

export const aplicacaoRoute: Routes = [
  {
    path: '',
    component: AplicacaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AplicacaoDetailComponent,
    resolve: {
      aplicacao: AplicacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AplicacaoUpdateComponent,
    resolve: {
      aplicacao: AplicacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacaos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AplicacaoUpdateComponent,
    resolve: {
      aplicacao: AplicacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacaos'
    },
    canActivate: [UserRouteAccessService]
  }
];
