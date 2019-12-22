import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProjeto, Projeto } from 'app/shared/model/projeto.model';
import { ProjetoService } from './projeto.service';
import { ProjetoComponent } from './projeto.component';
import { ProjetoDetailComponent } from './projeto-detail.component';
import { ProjetoUpdateComponent } from './projeto-update.component';

@Injectable({ providedIn: 'root' })
export class ProjetoResolve implements Resolve<IProjeto> {
  constructor(private service: ProjetoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjeto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((projeto: HttpResponse<Projeto>) => {
          if (projeto.body) {
            return of(projeto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Projeto());
  }
}

export const projetoRoute: Routes = [
  {
    path: '',
    component: ProjetoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projetos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProjetoDetailComponent,
    resolve: {
      projeto: ProjetoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projetos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProjetoUpdateComponent,
    resolve: {
      projeto: ProjetoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projetos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProjetoUpdateComponent,
    resolve: {
      projeto: ProjetoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projetos'
    },
    canActivate: [UserRouteAccessService]
  }
];
