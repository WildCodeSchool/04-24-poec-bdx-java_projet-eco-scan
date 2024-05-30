import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NotFoundComponent } from './components/feature/not-found/not-found.component';
import { SharedModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    ErrorPageComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorPagesRoutingModule,
    SharedModule
  ]
})
export class ErrorPagesModule { }
