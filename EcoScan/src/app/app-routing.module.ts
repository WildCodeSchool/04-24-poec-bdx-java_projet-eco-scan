import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './shared-module/guards/admin.guard';

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
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
    canActivate: [adminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
