import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AppCreatorSharedModule } from 'app/shared/shared.module';
import { AppCreatorCoreModule } from 'app/core/core.module';
import { AppCreatorAppRoutingModule } from './app-routing.module';
import { AppCreatorHomeModule } from './home/home.module';
import { AppCreatorEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AppCreatorSharedModule,
    AppCreatorCoreModule,
    AppCreatorHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppCreatorEntityModule,
    AppCreatorAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class AppCreatorAppModule {}
