import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricPageComponent } from './pages/historic-page.component';
import { WasteComponent } from './components/waste/waste.component';
import { PromosComponent } from './components/promos/promos.component';
import { userResolver } from '../shared-module/shared/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: HistoricPageComponent,
    children: [
      { path: '', redirectTo: 'waste', pathMatch: 'full' },
      {
        path: 'waste',
        component: WasteComponent,
        data: { animation: 'isRight' },
        resolve: { user: userResolver },
      },
      {
        path: 'promos',
        component: PromosComponent,
        data: { animation: 'isLeft' },
        resolve: { user: userResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricRoutingModule {}
