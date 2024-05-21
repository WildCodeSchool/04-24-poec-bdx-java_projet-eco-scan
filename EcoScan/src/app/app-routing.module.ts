import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./host/host.module').then(
      (m) => m.HostModule
    ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'mypromos',
    loadChildren: () =>
      import('./my-promos-page/my-promos.module').then(
        (m) => m.MyPromosModule
      ),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./map-page/map-page.module').then(
        (m) => m.MapPageModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
