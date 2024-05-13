import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPagesComponent } from './pages/landing-pages/landing-pages.component';
import { authGuard } from '../host/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPagesComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
