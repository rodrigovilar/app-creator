import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppCreatorSharedModule } from 'app/shared/shared.module';
import { ProjetoComponent } from './projeto.component';
import { ProjetoDetailComponent } from './projeto-detail.component';
import { ProjetoUpdateComponent } from './projeto-update.component';
import { ProjetoDeleteDialogComponent } from './projeto-delete-dialog.component';
import { projetoRoute } from './projeto.route';

@NgModule({
  imports: [AppCreatorSharedModule, RouterModule.forChild(projetoRoute)],
  declarations: [ProjetoComponent, ProjetoDetailComponent, ProjetoUpdateComponent, ProjetoDeleteDialogComponent],
  entryComponents: [ProjetoDeleteDialogComponent]
})
export class AppCreatorProjetoModule {}
