import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagedWastePageComponent } from './pages/staged-waste-page/staged-waste-page.component';
// import { stagedWasteResolver } from '../shared-module/shared/resolvers/staged-waste.resolver';

const routes: Routes = [
  {
    path: '',
    component: StagedWastePageComponent,
    // resolve: { stagedWaste: stagedWasteResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StagedWasteRoutingModule {}
