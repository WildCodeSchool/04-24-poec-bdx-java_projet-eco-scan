import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page.component';
import { AdminPromosComponent } from './pages/admin-promos/admin-promos.component';
import { AdminStatsComponent } from './pages/admin-stats/admin-stats.component';

const routes: Routes = [
  {path: '', component: AdminPageComponent, children:[
    {path: 'promos', component: AdminPromosComponent},
    {path: 'stats', component: AdminStatsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
