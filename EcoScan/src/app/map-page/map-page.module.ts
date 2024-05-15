import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/feature/map/map.component';
import { MapPageModuleRouting } from './map-page-routing.module';
import { SharedModule } from '../shared-module/shared-module.module';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapUiComponent } from './components/ui/map-ui/map-ui.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent,
    MapPageComponent,
    MapUiComponent
  ],
  imports: [
    CommonModule,
    MapPageModuleRouting,
    SharedModule,
    DropdownModule,
    FormsModule
  ]
})
export class MapPageModule { }
