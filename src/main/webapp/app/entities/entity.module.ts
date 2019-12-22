import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projeto',
        loadChildren: () => import('./projeto/projeto.module').then(m => m.AppCreatorProjetoModule)
      },
      {
        path: 'aplicacao',
        loadChildren: () => import('./aplicacao/aplicacao.module').then(m => m.AppCreatorAplicacaoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AppCreatorEntityModule {}
