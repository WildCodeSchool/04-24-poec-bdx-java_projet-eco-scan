import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricPageComponent } from './pages/historic-page.component';
import { WasteComponent } from './components/waste/waste.component';
import { PromosComponent } from './components/promos/promos.component';

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
      },
      {
        path: 'promos',
        component: PromosComponent,
        data: { animation: 'isLeft' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricRoutingModule {}
