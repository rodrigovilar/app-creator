import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppCreatorSharedModule } from 'app/shared/shared.module';
import { AplicacaoComponent } from './aplicacao.component';
import { AplicacaoDetailComponent } from './aplicacao-detail.component';
import { AplicacaoUpdateComponent } from './aplicacao-update.component';
import { AplicacaoDeleteDialogComponent } from './aplicacao-delete-dialog.component';
import { aplicacaoRoute } from './aplicacao.route';

@NgModule({
  imports: [AppCreatorSharedModule, RouterModule.forChild(aplicacaoRoute)],
  declarations: [AplicacaoComponent, AplicacaoDetailComponent, AplicacaoUpdateComponent, AplicacaoDeleteDialogComponent],
  entryComponents: [AplicacaoDeleteDialogComponent]
})
export class AppCreatorAplicacaoModule {}
