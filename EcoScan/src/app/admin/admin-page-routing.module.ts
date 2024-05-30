import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPromosComponent } from './pages/admin-promos/admin-promos.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';

const routes: Routes = [
    {path: '', redirectTo: 'promos', pathMatch: 'full'},
    {path: 'promos', component: AdminPromosComponent},
    {path: 'stats', component: AdminStatsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
