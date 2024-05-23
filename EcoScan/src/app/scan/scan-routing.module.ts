import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanPageComponent } from './pages/scan-page/scan-page.component';

const routes: Routes = [{ path: '', component: ScanPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanRoutingModule {}
