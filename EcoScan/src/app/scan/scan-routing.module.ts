import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanPageComponent } from './pages/scan-page/scan-page.component';
import { userResolver } from '../shared-module/shared/resolvers/user.resolver';

const routes: Routes = [
  { path: '', component: ScanPageComponent, resolve: { user: userResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanRoutingModule {}
