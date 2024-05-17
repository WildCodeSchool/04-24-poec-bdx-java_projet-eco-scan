import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesComponent } from './pages/landing-pages/landing-pages.component';

const routes: Routes = [
  { path: '', component: LandingPagesComponent },
  {
    path: 'map',
    loadChildren: () =>
      import('../map-page/map-page.module').then((m) => m.MapPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
