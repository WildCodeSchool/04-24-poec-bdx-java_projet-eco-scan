import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPromosComponent } from './pages/admin-promos/admin-promos.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';
import { AdminTypesComponent } from './pages/admin-types/admin-types.component';
import { AdminBrandsComponent } from './pages/admin-brands/admin-brands.component';

const routes: Routes = [
    {path: '', redirectTo: 'promos', pathMatch: 'full'},
    {path: 'promos', component: AdminPromosComponent},
    {path: 'stats', component: AdminStatsComponent},
    {path: 'brands', component: AdminBrandsComponent},
    {path: 'types', component: AdminTypesComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
