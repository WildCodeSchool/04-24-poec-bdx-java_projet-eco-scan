import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryPageComponent } from './pages/glossary-page/glossary-page.component';

const routes: Routes = [{ path: '', component: GlossaryPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlossaryRoutingModule {}
