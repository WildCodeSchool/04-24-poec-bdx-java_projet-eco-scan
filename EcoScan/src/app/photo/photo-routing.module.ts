import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhtoPageComponent } from './pages/phto-page/phto-page.component';

const routes: Routes = [{ path: '', component: PhtoPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoRoutingModule {}
