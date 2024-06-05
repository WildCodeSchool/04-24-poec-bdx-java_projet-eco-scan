import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagedWastePageComponent } from './pages/staged-waste-page/staged-waste-page.component';

const routes: Routes = [
  {
    path: '',
    component: StagedWastePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StagedWasteRoutingModule {}
