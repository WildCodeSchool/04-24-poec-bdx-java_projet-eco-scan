import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPageComponent } from './components/map-page/map-page.component';

const routes: Routes = [
  {path: '', component: MapPageComponent},
  {path: 'map', component: MapPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapPageModuleRouting { }
