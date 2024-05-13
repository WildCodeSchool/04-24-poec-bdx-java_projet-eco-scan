import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './components/map-page/map-page.component';
import { MapPageModuleRouting } from './map-page-routing.module';
import { SharedModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    MapPageComponent
  ],
  imports: [
    CommonModule,
    MapPageModuleRouting,
    SharedModule
  ]
})
export class MapPageModule { }
