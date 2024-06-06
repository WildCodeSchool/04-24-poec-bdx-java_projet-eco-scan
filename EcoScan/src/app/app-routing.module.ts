import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './shared-module/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./host/host.module').then((m) => m.HostModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then((m) => m.ScanModule),
  },
  {
    path: 'photo',
    loadChildren: () =>
      import('./photo/photo.module').then((m) => m.PhotoModule),
  },
  {
    path: 'mypromos',
    loadChildren: () =>
      import('./my-promos-page/my-promos.module').then((m) => m.MyPromosModule),
  },
  {
    path: 'historic',
    loadChildren: () =>
      import('./historic/historic.module').then((m) => m.HistoricModule),
  },
  {
    path: 'staged',
    loadChildren: () =>
      import('./staged-waste/staged-waste.module').then(
        (m) => m.StagedWasteModule
      ),
  },
  {
    path: 'glossary',
    loadChildren: () =>
      import('./glossary/glossary.module').then((m) => m.GlossaryModule),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./map-page/map-page.module').then((m) => m.MapPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-page.module').then((m) => m.AdminPageModule),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
